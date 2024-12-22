import React from 'react';
import { Stack, Typography } from '@mui/material';
import { User } from './components/user/user.tsx';
import { useAuth } from '../../auth/authContext.tsx';
import { useLocation } from 'react-router-dom';
import { ERoutes } from '../../router/types.ts';
import { APP_NAME } from '../../constants.ts';

export const Header = () => {
    const { isAuthenticated } = useAuth();

    const location = useLocation();
    const isLoginRoute = location.pathname.includes(ERoutes.LOGIN);

    return <Stack sx={{ ...headerStyle, ...(isLoginRoute ? loginStyle : {}) }}>
        <Typography fontFamily={'Poppins'} variant={'h5'} sx={logoStyle}>{APP_NAME}</Typography>
        {isAuthenticated && <User />}
    </Stack>;
}

const headerStyle = {
    position: 'relative',
    alignItems: 'center',
    p: 2,
};

const loginStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
};

const logoStyle = {
    letterSpacing: -0.8,
    userSelect: 'none',
    fontWeight: 900,
};
