import { alpha, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../../../style/theme.ts';

export const Slide_4_1 = () => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            src={'./stories/slide_4_1.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Как изменить порядок?
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Чтобы изменить порядок, достаточно перетащить элемент в желаемое место!
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Также можно перетаскивать из одной группы в другую. А банк или карта автоматически изменятся в соотвествие с группой.
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
        height: theme.spacing(14),
        zIndex: 5,
        background: 'linear-gradient(180deg, #120b1b 20%, transparent)',
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
