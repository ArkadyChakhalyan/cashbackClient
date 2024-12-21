import { enqueueSnackbar, OptionsWithExtraProps } from 'notistack';
import { ESnackbarVariant } from '../../../types.ts';

export const showSuccessSnackbar = (
    message: string,
    options?: OptionsWithExtraProps<'success'>,
) => {
    enqueueSnackbar(message, {
        variant: ESnackbarVariant.SUCCESS,
        ...options,
    });
};
