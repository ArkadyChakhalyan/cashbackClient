import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_1_4: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            onLoad={onLoad}
            src={'/stories/slide_1_4.png'}
        />
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
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        zIndex: 5,
        height: theme.spacing(12),
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
