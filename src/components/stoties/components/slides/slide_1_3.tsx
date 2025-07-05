import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_1_3: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            onLoad={onLoad}
            src={'/stories/slide_1_3.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Фильтры
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Для удобства есть готовые фильтры, чтобы не вводить весь текст вручную.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Вы можете пролистать и найти нужный кэшбэк, или начать вводить категорию и выбрать один из предложенных вариантов. Также, при необходимости, можно ввести свой вариант.
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
