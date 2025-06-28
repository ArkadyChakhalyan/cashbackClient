import React from 'react';
import { Stack, Typography } from '@mui/material';
import { theme } from '../../style/theme.ts';
import { OFFLINE_PAGE_TEXT, OFFLINE_PAGE_TITLE } from './constants.ts';
import WifiOffRoundedIcon from '@mui/icons-material/WifiOffRounded';

export const OfflinePage = () => {
    return <Stack sx={containerStyle}>
        <WifiOffRoundedIcon sx={iconStyle} />
        <Typography variant={'h5'} fontWeight={300} textAlign={'center'}>
            {OFFLINE_PAGE_TITLE}
        </Typography>
        <Typography variant={'body2'} textAlign={'center'}>
            {OFFLINE_PAGE_TEXT}
        </Typography>
    </Stack>;
}

const containerStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    gap: 1.5,
    width: '100%',
    maxWidth: '80%',
    alignItems: 'center',
    justifyContent: 'center',
};

const iconStyle = {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
};
