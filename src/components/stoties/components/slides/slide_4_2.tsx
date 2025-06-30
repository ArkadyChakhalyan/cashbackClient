import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TSlideProps } from './types.ts';

export const Slide_4_2: FC<TSlideProps> = ({
    onLoad,
}) => {
    return <Stack sx={containerStyle}>
        <Box
            sx={imgStyle}
            component={'img'}
            onLoad={onLoad}
            src={'./stories/slide_4_2.png'}
        />
        <Stack sx={contentStyle}>
            <Typography variant={'h5'} mb={1}>
                Также можно изменить порядок групп!
            </Typography>
            <Typography variant={'body1'} sx={textStyle}>
                Чтобы изменить порядок, просто перетащите группу за любое место, кроме внутренних элементов.
            </Typography>
        </Stack>
    </Stack>;
}

const containerStyle = {
    pt: 2,
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
