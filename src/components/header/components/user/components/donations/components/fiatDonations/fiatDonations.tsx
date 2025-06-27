import React from 'react';
import { Button, Link, Stack, Typography } from '@mui/material';
import { FIAT_DONATIONS_CLOUD_TIPS, FIAT_DONATIONS_CLOUD_TIPS_URL, FIAT_DONATIONS_TITLE } from './constants.ts';
import { theme } from '../../../../../../../../style/theme.ts';

export const FiatDonations = () => {
    return <Stack alignItems={'center'} gap={1.5} width={'100%'}>
        <Typography mb={0.5} variant={'body1'}>{FIAT_DONATIONS_TITLE}</Typography>
        <Button
            href={FIAT_DONATIONS_CLOUD_TIPS_URL}
            target={'_blank'}
            sx={{
                height: theme.spacing(5),
                minWidth: theme.spacing(25),
                [theme.breakpoints.down('sm')]: {
                    height: theme.spacing(6),
                }
            }}
        >
            {FIAT_DONATIONS_CLOUD_TIPS}
        </Button>
    </Stack>;
}
