import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TEventProps } from './types.ts';
import { theme } from '../../style/theme.ts';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

export const Event: FC<TEventProps> = ({
    text,
    x,
    y,
}) => {
    return <>
        <Stack
            flexDirection={'row'}
            sx={{
                ...eventStyle,
                left: x,
                top: y,
            }}
        >
            <Typography
                fontFamily={'Nunito'}
                variant={'body2'}
                sx={outlineStyle}
            >
                {text}
            </Typography>
            <Typography
                fontFamily={'Nunito'}
                variant={'body2'}
                sx={textStyle}
            >
                {text}
            </Typography>
            <AutoAwesomeRoundedIcon sx={iconStyle} />
        </Stack>
        <style>
            {keyframes}
        </style>
    </>;
}

const eventStyle = {
    position: 'fixed',
    zIndex: 9999,
    transform: `scale(0.8) translate(calc(-50% + ${theme.spacing(1.25)}), ${theme.spacing(-6)})`,
    animation: 'moveUpFadeOut 1s ease-out forwards',
    transition: 'all 0.25s ease-in-out',
};

const textStyle = {
    color: theme.palette.success.dark,
    fontSize: '1.15rem',
    fontWeight: 700,
    letterSpacing: '-0.04rem',
    zIndex: 10,
};

const outlineStyle = {
    ...textStyle,
    position: 'absolute',
    color: theme.palette.common.white,
    WebkitTextStroke: '5px',
};

const iconStyle = {
    color: theme.palette.common.white,
    transform: 'translate(-25%, -50%)',
    width: theme.spacing(2.25),
    height: theme.spacing(2.25),
    textShadow: theme.shadows[5],
};

const keyframes = `
@keyframes moveUpFadeOut {
    0% {
        opacity: 0.7;
        transform: scale(0.8) translate(calc(-50% + ${theme.spacing(1.25)}), ${theme.spacing(-6)});
    }
    20% {
        opacity: 1;
        transform: scale(1) translate(calc(-50% + ${theme.spacing(1.25)}), ${theme.spacing(-6)});
    }
    25% {
        opacity: 1;
        transform: scale(1) translate(calc(-50% + ${theme.spacing(1.25)}), ${theme.spacing(-6)});
    }
    100% {
        opacity: 0;
        transform: translate(calc(-50% + ${theme.spacing(1.25)}), ${theme.spacing(-10)});
    }
}
`;
