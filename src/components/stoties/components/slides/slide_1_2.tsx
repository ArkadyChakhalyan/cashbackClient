import { alpha, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_1_2 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_1_2.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Форма добавления кешбэка
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Обязательные поля для заполнения: банк, категория, процент.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                При необходимости можно создать карту, и добавлять ее к нужным кэшбэкам. Карта сохранится, далее ее будет нужно только выбрать.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                После добавления кэшбэк можно будет изменить.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pt: 5,
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(15),
        zIndex: 5,
        background: 'linear-gradient(180deg, #120b1b 30%, transparent)',
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
        height: theme.spacing(5),
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
