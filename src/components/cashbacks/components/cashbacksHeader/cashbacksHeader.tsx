import { Stack } from '@mui/material';
import React from 'react';
import { CashbacksPeriod } from './components/cashbacksPeriod/cashbacksPeriod.tsx';
import { theme } from '../../../../style/theme.ts';
import { CashbacksActions } from './components/cashbacksActions/cashbacksActions.tsx';

export const CashbacksHeader = () => {
    return <Stack direction={'row'} sx={containerStyle}>
        <CashbacksPeriod />
        <CashbacksActions />
    </Stack>;
}

const containerStyle = {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: theme.spacing(5),
    marginTop: `${theme.spacing(1)} !important`,
    [theme.breakpoints.down('sm')]: {
        pl: 0.5,
    },
};
