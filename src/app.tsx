import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './router/protectedRoute.tsx';
import { Header } from './components/header/header.tsx';
import { useAuth } from './auth/authContext.tsx';
import { DashboardPage } from './pages/dashboardPage/dashboardPage.tsx';
import { LoginPage } from './pages/loginPage/loginPage.tsx';
import { useLazyGetUserQuery } from './store/userApi/userApiSlice.ts';
import { GlobalStyles } from '@mui/material';
import { theme } from './style/theme.ts';
import { ERoutes } from './router/types.ts';
import { SnackbarStack } from './components/snackbarStack/snackbarStack.tsx';
import { LandingPage } from './pages/landingPage/landingPage.tsx';

export const App = () => {
    const { logout, isAuthenticated } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const [triggerGetUser, { data: user, isError, isSuccess }] = useLazyGetUserQuery();

    const isLoginRoute = location.pathname.includes(ERoutes.LOGIN);

    useEffect(() => {
        if (!isAuthenticated || isLoginRoute || user) return;
        triggerGetUser(null, true);
    }, [location]);

    useEffect(() => {
        if (isError) {
            logout();
            navigate('/' + ERoutes.LOGIN);
        }
    }, [isError, user]);

    useEffect(() => {
        if (!isSuccess || !user) return;
        navigate('/' + ERoutes.DASHBOARD);
    }, [isSuccess, user]);

    return <>
        <GlobalStyles styles={styles} />
        <SnackbarStack />
        <Header />
        <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'/' + ERoutes.LOGIN} element={<LoginPage />} />
            <Route
                path={'/' + ERoutes.DASHBOARD}
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to={`/${isAuthenticated ? ERoutes.DASHBOARD : ''}`} />} />
        </Routes>
    </>;
};

const styles = {
    body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: 0,
        background: theme.palette.darkBackground.main,
    },
    '#root': {
        maxWidth: theme.spacing(80),
        width: '100%',
    }
};
