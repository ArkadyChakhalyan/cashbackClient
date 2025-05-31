import React, { FC, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { TCashbackFormNameProps } from './types.ts';
import {
    CASHBACK_FORM_NAME_BASE_CHIPS,
    CASHBACK_FORM_NAME_CHIPS_OTP,
    CASHBACK_FORM_NAME_PLACEHOLDER
} from './constants.ts';
import { CashbackFormChips } from '../cashbackFormChips/cashbackFormChips.tsx';
import { theme } from '../../../../../../style/theme.ts';
import { EBank } from 'cashback-check-types';

export const CashbackFormName: FC<TCashbackFormNameProps> = ({
    bank,
    name,
    setName,
}) => {
    const [isTyping, setTyping] = useState(null);
    const [chips, setChips] = useState(CASHBACK_FORM_NAME_BASE_CHIPS);

    useEffect(() => {
        if (!name) {
            setTyping(false);
        }
    }, [name]);

    useEffect(() => {
        let chips = CASHBACK_FORM_NAME_BASE_CHIPS;
        if (bank === EBank.OTP) {
            chips = CASHBACK_FORM_NAME_CHIPS_OTP;
        }
        setChips(chips);
    }, [bank, name]);

    return <Stack gap={1} sx={containerStyle}>
        <TextField
            value={name}
            onChange={e => {
                setName(e.target.value);
                setTyping(true);
            }}
            placeholder={CASHBACK_FORM_NAME_PLACEHOLDER}
            fullWidth
        />
        <CashbackFormChips
            chips={chips}
            isFilter={isTyping}
            value={name}
            onSelect={value => setName(value as string)}
        />
    </Stack>;
}

const containerStyle = {
    position: 'relative',
    width: theme.spacing(48),
    maxWidth: '100%',
};
