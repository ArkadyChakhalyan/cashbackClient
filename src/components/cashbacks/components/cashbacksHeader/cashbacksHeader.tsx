import { Stack } from '@mui/material';
import { ViewType } from './components/viewType/viewType.tsx';
import React from 'react';
import { CashbacksPeriod } from './components/cashbacksPeriod/cashbacksPeriod.tsx';
import { theme } from '../../../../style/theme.ts';

export const CashbacksHeader = () => {
    return <Stack direction={'row'} sx={containerStyle}>
        <CashbacksPeriod />
        <ViewType />
    </Stack>;
}

const containerStyle = {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: theme.spacing(5),
};
