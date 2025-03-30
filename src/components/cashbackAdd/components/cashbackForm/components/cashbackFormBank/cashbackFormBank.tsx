import React, { FC, useEffect, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { TCashbackFormBankProps } from './types.ts';
import { theme } from '../../../../../../style/theme.ts';
import { CashbackBank } from '../../../../../cashbackBank/cashbackBank.tsx';
import { getUserBanks } from '../../../../../../store/cashbackApi/selectors/getUserBanks.ts';
import { useSelector } from 'react-redux';
import { CashbackFormCard } from './components/cashbackFormCard/cashbackFormCard.tsx';
import { getCards } from '../../../../../../store/cardApi/selectors/getCards.ts';
import { getSortedBanks } from './selectors/getSortedBanks.ts';

export const CashbackFormBank: FC<TCashbackFormBankProps> = ({
    bank,
    card,
    isOpen,
    setBank,
    setCard,
}) => {
    const userBanks = useSelector(getUserBanks);
    const cards = useSelector(getCards);
    const [banks, setBanks] = useState(getSortedBanks(userBanks, cards));

    useEffect(() => {
        setBanks(getSortedBanks(userBanks, cards));
    }, [isOpen]);

    return <Stack gap={1} sx={containerStyle}>
        <Stack gap={0.25} sx={banksStyle}>
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
                </IconButton>
            ))}
        </Stack>
        <CashbackFormCard card={card} setCard={setCard} bank={bank} />
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
};
