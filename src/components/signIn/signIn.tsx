import { Stack } from '@mui/material';
import { SignInButton } from './components/signInButton/signInButton.tsx';
import { SIGN_IN_OPTIONS } from './constants.ts';

export const SignIn = () => {
    return <Stack gap={1.5} sx={containerStyle}>
        {SIGN_IN_OPTIONS.map(option =>
            <SignInButton
                key={option.provider}
                Icon={option.Icon}
                provider={option.provider}
                label={option.label}
            />
        )}
    </Stack>;
}

const containerStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
};
