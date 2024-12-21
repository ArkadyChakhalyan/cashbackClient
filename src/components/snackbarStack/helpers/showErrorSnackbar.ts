import { enqueueSnackbar, OptionsWithExtraProps, SnackbarMessage } from 'notistack';
import { ERROR_BASE } from '../../../constants.ts';
import { ESnackbarVariant } from '../../../types.ts';

export const showErrorSnackbar = (
    message: SnackbarMessage = ERROR_BASE,
    options?: OptionsWithExtraProps<'error'>,
) => {
    enqueueSnackbar(message, {
        variant: ESnackbarVariant.ERROR,
        ...options,
    });
};
