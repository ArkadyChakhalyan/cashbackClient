import { alpha, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_1_4: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Stack sx={imgContainerStyle}>
            <Box
                sx={imgStyle}
                component={'img'}
                onLoad={onLoad}
                src={'./stories/slide14.png'}
            />
        </Stack>
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Добавление
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                После заполнения обязательных полей вы можете быстро добавить ещё одну категорию, избегая повторного ввода данных.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                После нажатия на кнопку «Добавить ещё категорию» введённый кэшбэк будет добавлен, а форма останется открытой с заполненными данными (банк, карта, процент, месяц). Сбросится только поле «Категория».
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
    scale: 1.01,
};

const imgContainerStyle = {
    borderRadius: theme.spacing(1.75),
    overflow: 'hidden',
    background: theme.palette.background.default,
    boxShadow: `0 0 ${theme.spacing(2.5)} ${alpha(theme.palette.common.white, 0.3)}`,
};

