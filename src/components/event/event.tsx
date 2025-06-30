import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { TEventProps } from './types.ts';
import { theme } from '../../style/theme.ts';

export const Event: FC<TEventProps> = ({
    text,
    x,
    y,
}) => {
    return <>
        <Typography
            variant={'subtitle2'}
            fontWeight={500}
            sx={{
                ...eventStyle,
                left: x,
                top: y,
            }}
        >
            {text}
        </Typography>
        <style>
            {keyframes}
        </style>
    </>;
}

const eventStyle = {
    position: 'fixed',
    zIndex: 9999,
    transform: `translate(-50%, ${theme.spacing(-2.5)})`,
    color: theme.palette.success.main,
    animation: 'moveUpFadeOut 1s ease-out forwards',
    fontSize: '1rem',

};

const keyframes = `
@keyframes moveUpFadeOut {
    0% {
        opacity: 1;
        transform: translate(-50%, ${theme.spacing(-2.5)});
    }
    100% {
        opacity: 0;
        transform: translate(-50%, ${theme.spacing(-6)});
    }
}
`;
