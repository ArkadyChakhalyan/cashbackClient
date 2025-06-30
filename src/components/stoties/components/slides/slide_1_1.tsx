import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_1_1: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            onLoad={onLoad}
            src={'./stories/slide_1_1.png'}
        />
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
    pt: 8,
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(17),
        zIndex: 5,
        background: 'linear-gradient(180deg, #120b1b 50%, transparent)',
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
        height: theme.spacing(4.5),
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
