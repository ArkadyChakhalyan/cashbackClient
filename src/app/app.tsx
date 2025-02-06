import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PWAPrompt from 'react-ios-pwa-prompt';
import { APP_NAME } from '../constants.ts';
import {
    APP_PWA_ADD_TEXT,
    APP_PWA_DESCRIPTION,
    APP_PWA_SHARE_TEXT,
    APP_PWA_INSTALL_TIMEOUT,
    APP_PWA_INSTALL_SHOWED_LS
} from './constants.ts';
import { useAuth } from '../auth/authContext.tsx';
import { useLazyGetUserQuery } from '../store/userApi/userApiSlice.ts';
import { ERoutes } from '../router/types.ts';
import { GlobalStyles } from '@mui/material';
import { Header } from '../components/header/header.tsx';
import { LandingPage } from '../pages/landingPage/landingPage.tsx';
import { SnackbarStack } from '../components/snackbarStack/snackbarStack.tsx';
import { LoginPage } from '../pages/loginPage/loginPage.tsx';
import { ProtectedRoute } from '../router/protectedRoute.tsx';
import { DashboardPage } from '../pages/dashboardPage/dashboardPage.tsx';
import { theme } from '../style/theme.ts';
import { getIsIOS } from '../selectors/getIsIOS.ts';

export const App = () => {
    const { logout, isAuthenticated } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const [triggerGetUser, { data: user, isError, isSuccess }] = useLazyGetUserQuery();

    const [isShowPWAPrompt, setShowPWAPrompt] = useState(false);

    const isLoginRoute = location.pathname.includes(ERoutes.LOGIN);

    useEffect(() => {
        if (!isAuthenticated || isLoginRoute || user) return;
        triggerGetUser(null, true);
    }, [location]);

    useEffect(() => {
        if (isError && !isLoginRoute) {
            logout();
            navigate('/' + ERoutes.LOGIN);
        }
    }, [isError, user]);

    useEffect(() => {
        if (!isSuccess || !user) return;
        navigate('/' + ERoutes.DASHBOARD);
    }, [isSuccess, user]);

    useEffect(() => {
        const isIOS = getIsIOS();
        const canInstall = 'standalone' in window.navigator;
        //@ts-ignore
        const isInstalled = window.navigator.standalone === true;
        const isShowed = localStorage.getItem(APP_PWA_INSTALL_SHOWED_LS);
        if (!isAuthenticated || isShowed || !canInstall || isInstalled || !isIOS) {
            return;
        }
        setTimeout(() => {
            setShowPWAPrompt(true);
            localStorage.setItem(APP_PWA_INSTALL_SHOWED_LS, '1');
        }, APP_PWA_INSTALL_TIMEOUT);
    }, [isAuthenticated]);

    return <>
        <PWAPrompt
            appIconPath={'./apple-touch-icon.png'}
            copyTitle={APP_NAME}
            copyDescription={APP_PWA_DESCRIPTION}
            copyShareStep={APP_PWA_SHARE_TEXT}
            copyAddToHomeScreenStep={APP_PWA_ADD_TEXT}
            isShown={isShowPWAPrompt}
        />
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
            <Route path="*" element={<Navigate to={`/${isAuthenticated ? ERoutes.DASHBOARD : `/${ERoutes.LOGIN}`}`} />} />
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
