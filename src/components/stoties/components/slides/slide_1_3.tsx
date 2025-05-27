import { alpha, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_1_3 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_1_3.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Фильтры
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Для удобства существуют готовые фильтры, чтобы не приходилось печатать полностью текст.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Можно пролистать и найти нужный кэшбэк или начать вводить категорию и далее уже выбрать один из предложенных вариантов. Также можно ввести самому при необходимости.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pt: 6,
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(6),
        zIndex: 5,
        background: theme.palette.background.default,
    },
};

const contentStyle = {
    position: 'relative',
    p: 4,
    justifyContent: 'center',
    gap: theme.spacing(),
    flexGrow: 1,
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
