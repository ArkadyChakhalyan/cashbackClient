import { alpha, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_1_1: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Stack sx={imgContainerStyle}>
            <Box
                sx={imgStyle}
                component={'img'}
                onLoad={onLoad}
                src={'/stories/slide11.png'}
            />
        </Stack>
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Как добоавить кэшбэк
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Если вы ещё не знакомы с нашим приложением, давайте поближе познакомимся с его функционалом, который упростит ваше взаимодействие.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Чтобы добавить категорию, нажмите кнопку «Добавить» внизу экрана.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Затем заполните необходимые поля.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    p: theme.spacing(12, 3, 3),
    pointerEvents: 'none',
    userSelect: 'none',
};

const contentStyle = {
    position: 'relative',
    justifyContent: 'center',
    gap: theme.spacing(),
    flexGrow: 1,
};

const textStyle = {
    opacity: 0.8,
};

const imgStyle = {
    width: '100%',
    height: 'auto',
};

const imgContainerStyle = {
    p: 1,
    borderRadius: theme.spacing(1.75),
    overflow: 'hidden',
    background: theme.palette.darkBackground.main,
    boxShadow: `0 0 ${theme.spacing(2.5)} ${alpha(theme.palette.primary.main, 0.4)}`,
};
