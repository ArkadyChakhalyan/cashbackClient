import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext.tsx';
import { ERoutes, TProtectedRouteProps } from './types.ts';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to={'/' + ERoutes.LOGIN} />;
};
