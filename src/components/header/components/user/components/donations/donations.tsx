import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { TDonationsProps } from './types.ts';
import { Modal } from '../../../../../modal/modal.tsx';
import { DONATIONS_DESC, DONATIONS_TITLE } from './constants.ts';
import { CryptoDonations } from './components/cryptoDonations/cryptoDonations.tsx';
import { theme } from '../../../../../../style/theme.ts';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { FiatDonations } from './components/fiatDonations/fiatDonations.tsx';

export const Donations: FC<TDonationsProps> = ({
    isOpen,
    onClose,
}) => {
    const body = <Stack alignItems={'center'} gap={2} width={'100%'}>
        <Stack alignItems={'center'} sx={headerStyle}>
            <PaidRoundedIcon sx={iconStyle} />
            <Typography variant={'h5'} fontWeight={300}>{DONATIONS_TITLE}</Typography>
        </Stack>
        <Typography variant={'body2'} sx={descStyle}>
            {DONATIONS_DESC}
        </Typography>
        <Stack gap={3} alignItems={'center'} width={'100%'}>
            <FiatDonations />
            <CryptoDonations />
        </Stack>
    </Stack>;

    return <Modal
        body={body}
        isOpen={isOpen}
        onClose={onClose}
    />;
}

const headerStyle = {
    gap: 1.5,
    [theme.breakpoints.down('sm')]: {
        gap: 0.5,
    }
};

const iconStyle = {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: theme.palette.green.main,
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
};

const descStyle = {
    textAlign: 'center',
    width: '80%',
    minWidth: theme.spacing(32),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        minWidth: 'unset',
    }
};
