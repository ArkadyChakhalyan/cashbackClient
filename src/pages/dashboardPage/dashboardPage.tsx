import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { Cashbacks } from '../../components/cashbacks/cashbacks.tsx';
import { CashbackAdd } from '../../components/cashbackAdd/cashbackAdd.tsx';
import { theme } from '../../style/theme.ts';
import { getIsNewIphonePWA } from '../../selectors/getIsNewIphonePWA.ts';

export const DashboardPage = () => {
    const [isError, setError] = useState(null);

    const isNewIphonePWA = getIsNewIphonePWA();

    return <Stack
        sx={{
            ...dashboardStyle ,
            minHeight: `calc(100svh - ${theme.spacing(isNewIphonePWA ? 16 : 14)})`, // - header height and paddings
            pb: isNewIphonePWA ? 10 : 8,
        }}
        spacing={2}
    >
        <Cashbacks setError={setError} />
        {!isError && <CashbackAdd />}
    </Stack>;
}

const dashboardStyle = {
    position: 'relative',
    justifyContent: 'space-between',
    p: 3,
    [theme.breakpoints.down('sm')]: {
        px: 1.5,
    }
};
