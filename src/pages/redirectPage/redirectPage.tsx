import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { theme } from '../../style/theme.ts';
import { REDIRECT_PAGE_BUTTON, REDIRECT_PAGE_LINK, REDIRECT_PAGE_TEXT, REDIRECT_PAGE_TITLE } from './constants.ts';
import InputRoundedIcon from '@mui/icons-material/InputRounded';

export const RedirectPage = () => {
    return <Stack sx={containerStyle}>
        <Stack sx={contentStyle}>
            <InputRoundedIcon sx={iconStyle} />
            <Typography variant={'h5'} fontWeight={300} textAlign={'center'}>
                {REDIRECT_PAGE_TITLE}
            </Typography>
            <Typography variant={'body2'} textAlign={'center'}>
                {REDIRECT_PAGE_TEXT}
            </Typography>
            <Button
                sx={{ mt: 2 }}
                href={REDIRECT_PAGE_LINK}
            >
                {REDIRECT_PAGE_BUTTON}
            </Button>
        </Stack>
    </Stack>;
}

const contentStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    gap: 1.5,
    width: '80%',
    maxWidth: theme.spacing(50),
    alignItems: 'center',
    justifyContent: 'center',
};
const containerStyle = {
    position: 'fixed',
    inset: 0,
    background: theme.palette.darkBackground.main,
}

const iconStyle = {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
};
