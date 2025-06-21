import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_5_4 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_5_4.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Список МСС-кодов категории
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Полный список МСС-кодов также доступен в меню каждой категории.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Все данные взяты из официальных документов программы лояльности банка.
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
        height: theme.spacing(6),
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
