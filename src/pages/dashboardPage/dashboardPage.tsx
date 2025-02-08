import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { Cashbacks } from '../../components/cashbacks/cashbacks.tsx';
import { CashbackAdd } from '../../components/cashbackAdd/cashbackAdd.tsx';
import { theme } from '../../style/theme.ts';
import { getIsPWA } from '../../selectors/getIsPWA.ts';
import { getIsIphoneXorNewer } from '../../selectors/getIsIphoneXorNewer.ts';

export const DashboardPage = () => {
    const [isError, setError] = useState(null);

    return <Stack
        sx={{
            ...dashboardStyle ,
            pb: getIsIphoneXorNewer() && getIsPWA() ? 10 : 8,
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
    minHeight: `calc(100svh - ${theme.spacing(14)})`, // - header height and paddings
    p: 3,
    [theme.breakpoints.down('sm')]: {
        px: 1.5,
    }
};
