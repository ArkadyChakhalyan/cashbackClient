import { alpha, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_1_1 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_1_1.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Как добоавить кэшбэк
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Если вы еще не знакомы с нашим приложением, то давайте, познакомимся поближе с функционалом, который поможет упростить ваше взаимодействие с приложением.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Чтобы добавить категорию, нажмите на кнопку «Добавить» внизу экрана.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Далее заполните необходимые поля.
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
