import { alpha, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../style/theme.ts';
import { TStoryProps } from './types.ts';

export const Story: FC<TStoryProps> = ({
    color,
    imgUrl,
    isSeen,
    label,
    onClick,
}) => {
    return <>
        <Stack
            sx={{
                ...containerStyle,
                border: `${theme.spacing(0.25)} solid ${isSeen ? alpha(theme.palette.common.white, 0.2) : theme.palette.primary.main}`,
            }}
            onClick={onClick}
        >
            <Stack
                sx={{
                    ...contentStyle,
                    background: alpha(color, 0.5),
                }}
            >
                <Box
                    sx={imgStyle}
                    component={'img'}
                    src={imgUrl}
                />
                <Typography fontSize={'0.65rem'} lineHeight={1.3} fontWeight={400}>
                    {label}
                </Typography>
            </Stack>
        </Stack>
    </>;
}

const containerStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: theme.spacing(10),
    maxWidth: theme.spacing(10),
    minHeight: theme.spacing(10),
    maxHeight: theme.spacing(10),
    borderRadius: theme.spacing(3),
    overflow: 'hidden',
    border: `${theme.spacing(0.25)} solid ${theme.palette.primary.main}`,
    cursor: 'pointer',
};

const contentStyle = {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'end',
    minWidth: theme.spacing(7.5),
    maxWidth: theme.spacing(7.5),
    minHeight: theme.spacing(7.5),
    maxHeight: theme.spacing(7.5),
    p: theme.spacing(),
    borderRadius: theme.spacing(2.5),
    overflow: 'hidden',
    background: alpha(theme.palette.purple.main, 0.5),
};

const imgStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    inset: 0,
    zIndex: '-1',
    filter: 'blur(3px)',
}
