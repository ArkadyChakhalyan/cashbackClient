import { alpha, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_3_2 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_3_2.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Добавление новой категории
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                В диалоге добавления нового кэшбэка выберите нужный месяц.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                По умолчанию будет выбран месяц, отображённый на главном экране.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(16),
        zIndex: 5,
        background: 'linear-gradient(180deg, #120b1b 20%, transparent)',
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
