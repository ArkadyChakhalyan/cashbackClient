import React from 'react';
import { Stack, Typography } from '@mui/material';
import { HEADER_APP_NAME } from './constants.ts';
import { User } from './components/user/user.tsx';
import { useAuth } from '../../auth/authContext.tsx';

export const Header = () => {
    const { isAuthenticated } = useAuth();

    return <Stack sx={headerStyle}>
        <Typography fontFamily={'Poppins'} variant={'h5'} sx={logoStyle}>{HEADER_APP_NAME}</Typography>
        {isAuthenticated && <User />}
    </Stack>;
}

const headerStyle = {
    position: 'relative',
    alignItems: 'center',
    p: 2,
};

const logoStyle = {
    letterSpacing: -0.8,
    userSelect: 'none',
    fontWeight: 900,
};
