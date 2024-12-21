import React, { FC } from 'react';
import { alpha, Chip, Stack } from '@mui/material';
import { TCashbackFormNameProps } from './types.ts';
import { theme } from '../../../../../../style/theme.ts';

export const CashbackFormChips: FC<TCashbackFormNameProps> = ({
    chips,
    isFilter,
    value,
    onSelect,
}) => {
    if (isFilter) {
        chips = chips.filter(chip => chip.toLowerCase().includes(value.toLowerCase()));
    }
    return <Stack spacing={0.75} direction={'row'} sx={containerStyle}>
        {chips.map((chip) =>
            <Chip
                key={chip}
                sx={{
                    border: `1px solid ${value === chip ? theme.palette.primary.main : 'transparent'}`,
                    color: value === chip ? theme.palette.common.white : alpha(theme.palette.common.white, 0.7),
                }}
                label={chip}
                onClick={() => {
                    if (value === chip) {
                        onSelect('');
                    } else {
                        onSelect(chip);
                    }
                }}
            />
        )}
    </Stack>;
}

const containerStyle = {
    height: theme.spacing(4),
    overflow: 'scroll',
    '::-webkit-scrollbar': {
        display: 'none'
    }
};
