import { AUTH_TOKEN_LS } from '../auth/constants.ts';

export const getAuthToken = (): string => {
    return localStorage.getItem(AUTH_TOKEN_LS);
}
