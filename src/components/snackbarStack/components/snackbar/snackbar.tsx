import React, { forwardRef } from 'react';
import { Alert } from '@mui/material';
import { CustomContentProps } from 'notistack';

export const Snackbar = forwardRef<HTMLDivElement, CustomContentProps>(({
    variant,
    message
}, forwardedRef) => {
    return <Alert
        ref={forwardedRef}
        severity={variant !== 'default' ? variant : null}
    >
        {message}
    </Alert>;
});
