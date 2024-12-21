import React, { FC } from 'react';
import { Stack, TextField } from '@mui/material';
import { TCashbackFormPercentageProps } from './types.ts';
import {
    CASHBACK_FORM_PERCENTAGE_CHIPS,
    CASHBACK_FORM_PERCENTAGE_MAX_VALUE, CASHBACK_FORM_PERCENTAGE_MIN_VALUE,
    CASHBACK_FORM_PERCENTAGE_PLACEHOLDER
} from './constants.ts';
import { CashbackFormChips } from '../cashbackFormChips/cashbackFormChips.tsx';
import { theme } from '../../../../../../style/theme.ts';

export const CashbackAddModalPercentage: FC<TCashbackFormPercentageProps> = ({
    percentage,
    setPercentage,
}) => {
    return <Stack gap={1} sx={containerStyle}>
        <TextField
            value={percentage || ''}
            type={'number'}
            onChange={e => {
                let value = parseInt(e.target.value);
                if (value < CASHBACK_FORM_PERCENTAGE_MIN_VALUE) {
                    value = CASHBACK_FORM_PERCENTAGE_MIN_VALUE;
                } else if (value > CASHBACK_FORM_PERCENTAGE_MAX_VALUE) {
                    value = CASHBACK_FORM_PERCENTAGE_MAX_VALUE;
                }
                setPercentage(value);
            }}
            placeholder={CASHBACK_FORM_PERCENTAGE_PLACEHOLDER}
            fullWidth
        />
        <CashbackFormChips
            chips={CASHBACK_FORM_PERCENTAGE_CHIPS.map(percentage => String(percentage))}
            value={String(percentage)}
            onSelect={value => setPercentage(parseInt(value))}
        />
    </Stack>;
}

const containerStyle = {
    width: theme.spacing(48),
    maxWidth: '100%',
};
