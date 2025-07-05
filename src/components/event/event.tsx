import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TEventProps } from './types.ts';
import { theme } from '../../style/theme.ts';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { EVENT_HIDE_TIME } from '../../event/constants.ts';

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
                variant={'body2'}
                sx={outlineStyle}
            >
                {text}
            </Typography>
            <Typography
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
    transform: `scale(0.8) translate(calc(-50% + ${theme.spacing(1.5)}), ${theme.spacing(-8)})`,
    animation: `moveUpFadeOut ${EVENT_HIDE_TIME}ms ease-out forwards`,
    transition: 'all 0.25s ease-in-out',
};

const textStyle = {
    color: theme.palette.success.dark,
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
    fontSize: '1.5rem',
    fontWeight: 800,
    letterSpacing: '-0.05rem',
    zIndex: 10,
};

const outlineStyle = {
    ...textStyle,
    position: 'absolute',
    color: theme.palette.common.white,
    WebkitTextStroke: theme.spacing(1),
};

const iconStyle = {
    color: theme.palette.common.white,
    transform: 'translate(-25%, -50%)',
    width: theme.spacing(2.75),
    height: theme.spacing(2.75),
    textShadow: theme.shadows[5],
};

const keyframes = `
@keyframes moveUpFadeOut {
    0% {
        opacity: 0.7;
        transform: scale(0.8) translate(calc(-50% + ${theme.spacing(1.5)}), ${theme.spacing(-8)});
    }
    20% {
        opacity: 1;
        transform: scale(1) translate(calc(-50% + ${theme.spacing(1.5)}), ${theme.spacing(-8)});
    }
    25% {
        opacity: 1;
        transform: scale(1) translate(calc(-50% + ${theme.spacing(1.5)}), ${theme.spacing(-8)});
    }
    100% {
        opacity: 0;
        transform: translate(calc(-50% + ${theme.spacing(1.5)}), ${theme.spacing(-12)});
    }
}
`;
