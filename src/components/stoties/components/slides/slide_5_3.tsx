import { alpha, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_5_3: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Stack sx={imgContainerStyle}>
            <Box
                loading={'lazy'}
                sx={imgStyle}
                component={'img'}
                onLoad={onLoad}
                src={'/stories/slide53.png'}
            />
        </Stack>
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                🔍 Поиск категорий по МСС-коду
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Также можно искать по МСС-кодам — для этого введите код полностью.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Чтобы поиск работал корректно, при создании категории выбирайте её из быстрых фильтров либо вводите точно так, как указано в программе лояльности банка.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                В настоящее время поиск по МСС-кодам поддерживается для следующих банков: Т-Банк, Альфа, ВТБ, Яндекс, Озон, ОТП, ПСБ. Остальные банки будут добавляться постепенно.
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
    scale: 1.05,
};

const imgContainerStyle = {
    borderRadius: theme.spacing(1.75),
    overflow: 'hidden',
    background: theme.palette.background.default,
    boxShadow: `0 0 ${theme.spacing(2.5)} ${alpha(theme.palette.primary.main, 0.4)}`,
};
