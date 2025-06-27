import React, { useState } from 'react';
import { alpha, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import {
    CRYPTO_DONATIONS_COPIED,
    CRYPTO_DONATIONS_DEFAULT,
    CRYPTO_DONATIONS_OPTIONS,
    CRYPTO_DONATIONS_TITLE
} from './constants.ts';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { showSuccessSnackbar } from '../../../../../../../snackbarStack/helpers/showSuccessSnackbar.ts';
import { theme } from '../../../../../../../../style/theme.ts';
import { ECrypto } from './types.ts';

export const CryptoDonations = () => {
    const [crypto, setCrypto] = useState(CRYPTO_DONATIONS_DEFAULT);
    const selectedCrypto = CRYPTO_DONATIONS_OPTIONS.find(option => option.value == crypto);

    const onCopy = () => {
        try {
            navigator.clipboard.writeText(selectedCrypto.address);
        } catch {}
        showSuccessSnackbar(CRYPTO_DONATIONS_COPIED);
    };

    const onChange = (
        e: React.MouseEvent,
        value: ECrypto,
    ) => {
        if (!value || value === crypto) return;
        setCrypto(value);
    };

    return <Stack alignItems={'center'} gap={1.5} width={'100%'}>

        <Typography mb={0.5} variant={'body1'}>{CRYPTO_DONATIONS_TITLE}</Typography>
        <ToggleButtonGroup
            value={crypto}
            exclusive
            onChange={onChange}
        >
            {CRYPTO_DONATIONS_OPTIONS.map(crypto => {
                const Icon = crypto.icon;
                return <ToggleButton
                    key={crypto.value}
                    value={crypto.value}
                >
                    <Stack sx={iconStyle}>
                        <Icon />
                    </Stack>
                    {crypto.label}
                </ToggleButton>;
            })}
        </ToggleButtonGroup>
        <Stack sx={codeStyle}>
            <Typography noWrap sx={addressStyle}>{selectedCrypto.address}</Typography>
            <IconButton
                sx={copyStyle}
                onClick={onCopy}
            >
                <ContentCopyRoundedIcon />
            </IconButton>
        </Stack>
    </Stack>;
}

const codeStyle = {
    position: 'relative',
    width: `calc(100% - ${theme.spacing(10)})`,
    maxWidth: theme.spacing(60),
    alignItems: 'center',
    justifyContent: 'center',
    p: theme.spacing(2, 7, 2, 3),
    borderRadius: theme.spacing(3),
    background: alpha(theme.palette.common.white, 0.1),
};

const addressStyle = {
    maxWidth: '100%',
    fontFamily: 'Menlo, Consolas, "Droid Sans Mono", monospace',
    fontWeight: 400,
    fontSize: '13px',
    color: '#f8f8f2',
};

const iconStyle = {
    position: 'relative',
    ml: -1.25,
    mr: 0.75,
    '&:before': {
        content: '""',
        position: 'absolute',
        inset: 5,
        bgcolor: theme.palette.common.white,
    },
    '.MuiSvgIcon-root': {
        zIndex: 1,
    }
};

const copyStyle = {
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    bgcolor: alpha(theme.palette.common.white, 0.05),
};
