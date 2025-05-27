import { alpha, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_2_2 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_2_2.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Группировка по банкам
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Отображайте кэшбэк по банкам.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Наиболее подходящее и оптимальное отображение для новичков!
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pt: 4,
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(4),
        zIndex: 5,
        background: '#120b1b',
    },
};

const contentStyle = {
    position: 'relative',
    p: 4,
    pt: 2,
    justifyContent: 'center',
    flexGrow: 1,
    gap: theme.spacing(),
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(6),
        zIndex: 5,
        background: 'linear-gradient(0deg, #262130 10%, transparent)',
        transform: 'translateY(-100%)',
    },
};

const textStyle = {
    opacity: 0.8,
};

const imgStyle = {
    width: '100%',
    height: 'auto',
};
