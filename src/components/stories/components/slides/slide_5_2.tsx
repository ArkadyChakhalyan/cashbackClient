import { alpha, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_5_2: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Stack sx={imgContainerStyle}>
            <Box
                sx={imgStyle}
                component={'img'}
                onLoad={onLoad}
                src={'./stories/slide52.png'}
            />
        </Stack>
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                🔍 Поиск категорий по названию
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Для отображения всех соответствующих категорий начните вводить текст.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    p: theme.spacing(12, 3, 3),
    gap: 5,
    pointerEvents: 'none',
    userSelect: 'none',
};

const contentStyle = {
    position: 'relative',
    justifyContent: 'center',
    gap: theme.spacing(),
};

const textStyle = {
    opacity: 0.8,
};

const imgStyle = {
    width: '100%',
    height: 'auto',
    scale: 1.3,
};

const imgContainerStyle = {
    pt: 4,
    borderRadius: theme.spacing(1.75),
    overflow: 'hidden',
    background: theme.palette.darkBackground.main,
    boxShadow: `0 0 ${theme.spacing(2.5)} ${alpha(theme.palette.primary.main, 0.4)}`,
};
