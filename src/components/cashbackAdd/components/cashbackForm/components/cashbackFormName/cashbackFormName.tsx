import React, { FC, useEffect, useState } from 'react';
import { IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { TCashbackFormNameProps } from './types.ts';
import {
    CASHBACK_FORM_NAME_CHIPS,
    CASHBACK_FORM_NAME_LIMITLESS_TOOLTIP,
    CASHBACK_FORM_NAME_PLACEHOLDER
} from './constants.ts';
import { CashbackFormChips } from '../cashbackFormChips/cashbackFormChips.tsx';
import { theme } from '../../../../../../style/theme.ts';
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';

export const CashbackFormName: FC<TCashbackFormNameProps> = ({
    name,
    limitless,
    setName,
    setLimitless,
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
            sx={inputStyle}
            onChange={e => {
                setName(e.target.value);
                setTyping(true);
            }}
            placeholder={CASHBACK_FORM_NAME_PLACEHOLDER}
            fullWidth
        />
        <Tooltip title={CASHBACK_FORM_NAME_LIMITLESS_TOOLTIP}>
            <IconButton
                sx={{
                    ...buttonStyle,
                    ...(!limitless ? buttonNotActiveStyle : {}),
                }}
                onClick={() => setLimitless(!limitless)}
            >
                <AllInclusiveRoundedIcon
                    sx={{color: limitless ? theme.palette.primary.main : theme.palette.common.white}}
                />
            </IconButton>
        </Tooltip>
        <CashbackFormChips
            chips={CASHBACK_FORM_NAME_CHIPS}
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

const inputStyle = {
    '.MuiInputBase-input': {
        pr: 6,
    },
};

const buttonStyle = {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    background: 'none !important',
    zIndex: 10,
    transition: theme.transitions.create('opacity', {duration: 200, easing: 'ease-in-out'}),
};

const buttonNotActiveStyle = {
    opacity: 0.75,
    '&:hover': {
        opacity: 1,
    }
};
