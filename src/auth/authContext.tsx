import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { AUTH_TOKEN_LS } from './constants.ts';
import { getAuthToken } from '../selectors/getAuthToken.ts';
import { IAuthContextProps } from './types.ts';

const AuthContext = createContext<IAuthContextProps>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());

    const login = (token: string) => {
        localStorage.setItem(AUTH_TOKEN_LS, token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN_LS);
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
    </AuthContext.Provider>;
};

export const useAuth = (): IAuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
