import { alpha, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TBlockProps } from './types.ts';
import { theme } from '../../style/theme.ts';

export const Block: FC<TBlockProps> = ({
    img,
    isReversed,
    title,
    text,
}) => {
    return <Stack
        sx={{
            ...containerStyle,
            ...(isReversed ? reversedStyle : {})
        }}
        direction={'row'}
    >
        <Stack spacing={2}>
            <Typography variant={'h3'} sx={titleStyle}>{title}</Typography>
            <Stack>
                <Typography variant={'body1'} sx={textStyle}>{text}</Typography>
            </Stack>
        </Stack>
        <Stack sx={imageStyle}>
            {img}
        </Stack>
    </Stack>;
}

const containerStyle = {
    alignItems: 'center',
    gap: 3,
    minWidth: theme.spacing(94),
    maxWidth: '100%',
    borderRadius: theme.spacing(5),
    p: 6,
    bgcolor: alpha(theme.palette.common.white, 0.02),
    boxShadow: theme.shadows[9],
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
        maxWidth: `calc(100% - ${theme.spacing(20)})`,
        minWidth: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: `calc(100% - ${theme.spacing(14)})`,
        p: 3.5,
    }
};

const reversedStyle = {
    flexDirection: 'row-reverse',
};

const titleStyle = {
    [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.h4.fontSize,
    },
};

const textStyle = {
    opacity: 0.7,
};

const imageStyle = {
    width: '45%',
    [theme.breakpoints.down('md')]: {
        width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
    [theme.breakpoints.down(parseInt(theme.spacing(60)))]: {
        width: '100%',
    },
};
