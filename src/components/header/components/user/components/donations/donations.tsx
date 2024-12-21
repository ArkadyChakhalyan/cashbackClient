import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { TDonationsProps } from './types.ts';
import { Modal } from '../../../../../modal/modal.tsx';
import { DONATIONS_CONTACT, DONATIONS_DESC, DONATIONS_TITLE } from './constants.ts';
import { CryptoDonations } from './components/cryptoDonations/cryptoDonations.tsx';
import { theme } from '../../../../../../style/theme.ts';

export const Donations: FC<TDonationsProps> = ({
    isOpen,
    onClose,
}) => {
    const body = <Stack alignItems={'center'} gap={2} width={'100%'}>
        <Typography variant={'h6'} fontWeight={300} mt={-2}>{DONATIONS_TITLE}</Typography>
        <Typography variant={'body2'} sx={descStyle}>
            {DONATIONS_DESC}
            <br />
            {DONATIONS_CONTACT}
        </Typography>
        <CryptoDonations />
    </Stack>;

    return <Modal
        body={body}
        isOpen={isOpen}
        onClose={onClose}
    />;
}

const descStyle = {
    textAlign: 'center',
    width: '80%',
    minWidth: theme.spacing(32),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        minWidth: 'unset',
    }
}
