import React, { FC, useEffect, useState } from 'react';
import { alpha, IconButton, Stack, Typography } from '@mui/material';
import { TCashbackFormBankProps } from './types.ts';
import { theme } from '../../../../../../style/theme.ts';
import { CashbackBank } from '../../../../../cashbackBank/cashbackBank.tsx';
import { getUserBanks } from '../../../../../../store/cashbackApi/selectors/getUserBanks.ts';
import { useSelector } from 'react-redux';
import { CashbackFormCard } from './components/cashbackFormCard/cashbackFormCard.tsx';
import { getCards } from '../../../../../../store/cardApi/selectors/getCards.ts';
import { getSortedBanks } from './selectors/getSortedBanks.ts';
import { ECashbackPeriod } from '../../../../../../types.ts';
import { getCurrentMonthCashbacks } from '../../../../../../store/cashbackApi/selectors/getCurrentMonthCashbacks.ts';
import { getNextMonthCashbacks } from '../../../../../../store/cashbackApi/selectors/getNextMonthCashbacks.ts';
import { getShowAddCard } from '../../../../../../store/userApi/selectors/getShowAddCard.ts';
import { SCROLL_CLASS } from '../../../../../../customHooks/constants.tsx';

export const CashbackFormBank: FC<TCashbackFormBankProps> = ({
    bank,
    card,
    isOpen,
    period,
    setBank,
    setCard,
}) => {
    const userBanks = useSelector(getUserBanks);
    const cards = useSelector(getCards);
    const currentMonthCashbacks = useSelector(getCurrentMonthCashbacks);
    const nextMonthCashbacks = useSelector(getNextMonthCashbacks);
    const isShowAddCard = card || useSelector(getShowAddCard);
    const cashbacks = period === ECashbackPeriod.NEXT_MONTH ? nextMonthCashbacks : currentMonthCashbacks;
    const [banks, setBanks] = useState(getSortedBanks(userBanks, cards, cashbacks));

    useEffect(() => {
        setBanks(getSortedBanks(userBanks, cards, cashbacks));
    }, [isOpen, period, cashbacks]);

    return <Stack gap={1} sx={containerStyle}>
        <Stack gap={0.25} sx={banksStyle} className={SCROLL_CLASS}>
            {banks.map(item => (
                <IconButton
                    key={item.value}
                    sx={{
                        ...buttonStyle,
                        border: `1px solid ${bank === item.value ? theme.palette.primary.main : 'transparent'}`,
                    }}
                    onClick={() => {
                        if (bank === item.value) {
                            setBank(null);
                        } else {
                            setBank(item.value);
                        }
                    }}
                >
                    <CashbackBank bank={item.value} />
                    {!!item.cashbackCount &&
                        <Stack sx={countStyle}>
                            <Typography
                                variant={'caption'}
                                sx={{
                                    opacity: 1,
                                    lineHeight: 'unset',
                                    fontSize: item.cashbackCount > 9 ? '0.5rem' : '0.6rem',
                                    color: theme.palette.background.default,
                                }}
                            >
                                {item.cashbackCount > 9 ? '9+' : item.cashbackCount}
                            </Typography>
                        </Stack>
                    }
                </IconButton>
            ))}
        </Stack>
        {isShowAddCard && <CashbackFormCard card={card} setCard={setCard} bank={bank}/>}
    </Stack>;
}

const containerStyle = {
    width: theme.spacing(48),
    maxWidth: '100%',
};

const banksStyle = {
    height: theme.spacing(6),
    flexDirection: 'row',
    overflow: 'scroll',
    overflowY: 'hidden',
    '::-webkit-scrollbar': {
        display: 'none'
    }
};

const buttonStyle = {
    position: 'relative',
    height: theme.spacing(6),
    width: theme.spacing(6),
    p: theme.spacing(0.25),
    background: 'none !important',
    boxShadow: 'none !important',
};

const countStyle = {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: theme.spacing(1.75),
    maxWidth: theme.spacing(1.75),
    minHeight: theme.spacing(1.75),
    maxHeight: theme.spacing(1.75),
    overflow: 'hidden',
    right: theme.spacing(-0.25),
    bottom: theme.spacing(0.25),
    borderRadius: '50%',
    background: theme.palette.common.white,
    boxShadow: `0px 0px 0px 1.5px ${alpha(theme.palette.common.white, 0.5)}`,
};
