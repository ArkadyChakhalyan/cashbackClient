import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_4_1: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            onLoad={onLoad}
            src={'/stories/slide_4_1.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Как изменить порядок?
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Чтобы изменить порядок, просто перетащите элемент в нужное место.
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Элементы также можно перетаскивать из одной группы в другую — банк или карта автоматически изменятся в соответствии с выбранной группой.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pt: 4.5,
    pointerEvents: 'none',
    userSelect: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: theme.spacing(17),
        zIndex: 5,
        background: 'linear-gradient(180deg, #120b1b 25%, transparent)',
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
