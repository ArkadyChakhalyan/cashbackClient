import React, { FC, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { TCashbackFormNameProps } from './types.ts';
import { CASHBACK_FORM_NAME_CHIPS, CASHBACK_FORM_NAME_PLACEHOLDER } from './constants.ts';
import { CashbackFormChips } from '../cashbackFormChips/cashbackFormChips.tsx';
import { theme } from '../../../../../../style/theme.ts';

export const CashbackFormName: FC<TCashbackFormNameProps> = ({
    name,
    setName,
}) => {
    const [isTyping, setTyping] = useState(null);

    useEffect(() => {
        if (!name) {
            setTyping(false);
        }
    }, [name]);

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
            chips={CASHBACK_FORM_NAME_CHIPS}
            isFilter={isTyping}
            value={name}
            onSelect={value => setName(value as string)}
        />
    </Stack>;
}

const containerStyle = {
    width: theme.spacing(48),
    maxWidth: '100%',
};
