import { ReactNode } from 'react';

export type TProtectedRouteProps = {
    children: ReactNode;
}

export enum ERoutes {
    DASHBOARD = 'dashboard',
    LOGIN = 'login',
}
