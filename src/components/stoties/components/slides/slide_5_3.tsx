import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_5_3 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_5_3.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Поиск категорий по МСС-коду
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Также можно искать по МСС-кодам — для этого введите код полностью.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Чтобы поиск работал корректно, при создании категории выбирайте её из быстрых фильтров либо вводите точно так, как указано в программе лояльности банка.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                В настоящее время поиск по МСС-кодам поддерживается для следующих банков: Альфа, ВТБ, Яндекс, Озон, ОТП. Остальные банки будут добавляться постепенно.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pt: 3.5,
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(5),
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
