import React, { FC, useEffect, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { TCashbackFormBankProps } from './types.ts';
import { theme } from '../../../../../../style/theme.ts';
import { BANKS } from '../../../../../../constants.ts';
import { CashbackBank } from '../../../../../cashbackBank/cashbackBank.tsx';
import { getUserBanks } from '../../../../../../store/cashbackApi/selectors/getUserBanks.ts';
import { useSelector } from 'react-redux';

export const CashbackFormBank: FC<TCashbackFormBankProps> = ({
    bank,
    isOpen,
    setBank,
}) => {
    const userBanks = useSelector(getUserBanks);
    const [banks, setBanks] = useState([
        ...BANKS.filter(bank => userBanks.includes(bank.value)),
        ...BANKS.filter(bank => !userBanks.includes(bank.value)),
    ]);

    useEffect(() => {
        setBanks([
            ...BANKS.filter(bank => userBanks.includes(bank.value)),
            ...BANKS.filter(bank => !userBanks.includes(bank.value)),
        ]);
    }, [isOpen]);

    return <Stack gap={0.25} sx={containerStyle}>
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
    </Stack>;
}

const containerStyle = {
    width: theme.spacing(48),
    height: theme.spacing(6),
    maxWidth: '100%',
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
