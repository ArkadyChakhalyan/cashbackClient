import { alpha, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_2_1: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Stack sx={imgContainerStyle}>
            <Box
                loading={'lazy'}
                sx={imgStyle}
                component={'img'}
                onLoad={onLoad}
                src={'/stories/slide21.png'}
            />
        </Stack>
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
    pt: 1,
    pb: 4,
    borderRadius: theme.spacing(1.75),
    overflow: 'hidden',
    background: theme.palette.darkBackground.main,
    boxShadow: `0 0 ${theme.spacing(2.5)} ${alpha(theme.palette.primary.main, 0.4)}`,
};


