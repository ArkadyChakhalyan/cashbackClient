import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_5_1 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_5_1.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Как найти нужную категорию?
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Чтобы быстро найти нужную вам категорию, воспользуйтесь поиском.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pt: 8,
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(10),
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
        height: theme.spacing(8),
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
