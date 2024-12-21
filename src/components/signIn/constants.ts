import GoogleIcon from '@mui/icons-material/Google';
import { YandexIcon } from './icons/yandexIcon.tsx';
import { TSignInButtonProps } from './components/signInButton/types.ts';

export const SIGN_IN_OPTIONS: TSignInButtonProps[] = [
    // {
    //     label: 'Войти с помощью Google',
    //     provider: 'google',
    //     Icon: GoogleIcon,
    // },
    {
        label: 'Войти с помощью Yandex ID',
        provider: 'yandex',
        Icon: YandexIcon,
    },
];
