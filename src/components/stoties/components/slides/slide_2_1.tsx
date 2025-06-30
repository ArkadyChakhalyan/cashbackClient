import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_2_1: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            onLoad={onLoad}
            src={'./stories/slide_2_1.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Какую группировку выбрать
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Для удобства отображения выберите одну из доступных группировок.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                По умолчанию категории не группируются и отображаются в порядке их добавления.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Кнопка переключения находится над категориями, рядом с полем поиска.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pt: 16,
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
        background: '#120b1b',
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
