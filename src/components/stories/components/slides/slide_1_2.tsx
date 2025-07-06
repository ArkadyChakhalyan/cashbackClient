import { alpha, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_1_2: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Stack sx={imgContainerStyle}>
            <Box
                loading={'lazy'}
                sx={imgStyle}
                component={'img'}
                onLoad={onLoad}
                src={'/stories/slide12.png'}
            />
        </Stack>
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Форма добавления кэшбэка
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Обязательные поля для заполнения: банк, категория и процент.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                При необходимости можно создать карту и добавить её к нужным кэшбэкам. Карта будет сохранена, и в дальнейшем её нужно будет только выбрать.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                После добавления кэшбэка его можно будет изменить.
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
    boxShadow: `0 0 ${theme.spacing(2.5)} ${alpha(theme.palette.common.white, 0.3)}`,
};
