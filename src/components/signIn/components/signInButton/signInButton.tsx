import React, { FC, useState } from 'react';
import { TSignInButtonProps } from './types.ts';
import { theme } from '../../../../style/theme.ts';
import { getAuthToken } from '../../../../selectors/getAuthToken.ts';
import { showErrorSnackbar } from '../../../snackbarStack/helpers/showErrorSnackbar.ts';
import { BASE_API_URL } from '../../../../constants.ts';
import { ERoutes } from '../../../../router/types.ts';
import { LoadingButton } from '@mui/lab';
import { yellow } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../auth/authContext.tsx';
import { SIGN_IN_BUTTON_REDIRECT_URL_BASE } from './constants.ts';

export const SignInButton: FC<TSignInButtonProps> = ({
    Icon,
    label,
    provider,
}) => {
    const navigate = useNavigate();

    const { login, isAuthenticated } = useAuth();
    const [isLoading, setLoading] = useState(null);

    const onClick = () => {
        setLoading(true);

        const popup = window.open(SIGN_IN_BUTTON_REDIRECT_URL_BASE + provider, '_blank', 'width=500,height=600');

        const interval = setInterval(() => {
            if (popup && popup.closed) {
                clearInterval(interval);
                setLoading(false);
                if (!getAuthToken()) {
                    showErrorSnackbar();
                }
            }
        }, 500);

        const messageListener = (event: MessageEvent) => {
            console.log(event)
            if (event.origin !== BASE_API_URL) return;
            console.log(event)

            const token = event.data?.token;
            if (token) {
                login(token);
                navigate('/' + ERoutes.DASHBOARD);
                window.removeEventListener('message', messageListener);
            } else {
                showErrorSnackbar();
            }
        };

        window.addEventListener('message', messageListener);
    };

    return <LoadingButton
        onClick={onClick}
        startIcon={<><Icon sx={iconStyle} /><Icon sx={iconGlowStyle}/></>}
        loading={isLoading}
        loadingPosition={'start'}
        sx={buttonStyle}
        disabled={isLoading}
        fullWidth
    >
        {label}
    </LoadingButton>;
}

const buttonStyle = {
    whiteSpace: 'nowrap',
    fontWeight: 300,

    '.MuiLoadingButton-loadingIndicatorStart': {
        left: theme.spacing(-1.5),
    },
    '.MuiButton-icon': {
        position: 'relative',
    },
    '&:hover, &:focus, &:active': {
        '.MuiButton-startIcon .MuiSvgIcon-root': {
            opacity: 1,
            color: yellow[500],
        }
    }
};

const iconStyle = {
    transition: theme.transitions.create('all', {duration: 250, easing: 'ease-in-out'}),
}

const iconGlowStyle = {
    ...iconStyle,
    position: 'absolute',
    inset: 0,
    color: yellow[500],
    opacity: 0,
    filter: 'blur(6px)',
};
