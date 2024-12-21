import { SnackbarProvider } from 'notistack';
import { SNACKBAR_STACK_HIDE_TIMEOUT, SNACKBAR_STACK_MAX_COUNT } from './constants.ts';
import { Snackbar } from './components/snackbar/snackbar.tsx';

export const SnackbarStack= () => {
    return <SnackbarProvider
        dense
        maxSnack={SNACKBAR_STACK_MAX_COUNT}
        autoHideDuration={SNACKBAR_STACK_HIDE_TIMEOUT}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        Components={{
            error: Snackbar,
            success: Snackbar,
        }}
    />;
}
