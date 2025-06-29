export type IAuthContextProps = {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}
