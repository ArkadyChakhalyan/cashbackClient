import { alpha, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_2_3: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Stack sx={imgContainerStyle}>
            <Box
                sx={imgStyle}
                component={'img'}
                onLoad={onLoad}
                src={'./stories/slide23.png'}
            />
        </Stack>
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Группировка по картам
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Отображайте кэшбэк для каждой карты отдельно.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Категории без привязки к карте будут объединены в группировку по банкам.
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
    borderRadius: theme.spacing(1.75),
    overflow: 'hidden',
    background: theme.palette.background.default,
    boxShadow: `0 0 ${theme.spacing(2.5)} ${alpha(theme.palette.primary.main, 0.4)}`,
};
