import React, { FC, useEffect, useState } from 'react';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { CASHBACKS_EMPTY, CASHBACKS_ERROR, CASHBACKS_FAKE_COUNT, CASHBACKS_RELOAD } from './constants.ts';
import { useGetCashbacksQuery } from '../../store/cashbackApi/cashbackApiSlice.ts';
import { theme } from '../../style/theme.ts';
import { useSelector } from 'react-redux';
import { CashbacksHeader } from './components/cashbacksHeader/cashbacksHeader.tsx';
import { getIsLoading } from '../../store/cashbackApi/selectors/getIsLoading.ts';
import { getCashbacksView } from '../../store/userApi/selectors/getCashbacksView.ts';
import { CashbacksDefaultView } from './components/cashbacksDefaultView/cashbacksDefaultView.tsx';
import { CashbacksBankView } from './components/cashbacksBankView/cashbacksBankView.tsx';
import { getCurrentMonthCashbacks } from '../../store/cashbackApi/selectors/getCurrentMonthCashbacks.ts';
import { getPeriod } from '../../store/cashbacks/selectors/getPeriod.ts';
import { getNextMonthCashbacks } from '../../store/cashbackApi/selectors/getNextMonthCashbacks.ts';
import { ECashbackPeriod } from '../../types.ts';
import { showErrorSnackbar } from '../snackbarStack/helpers/showErrorSnackbar.ts';
import { TCashbacksProps } from './types.ts';
import ReplayIcon from '@mui/icons-material/Replay';
import { ECashbacksView } from 'cashback-check-types/user';

export const Cashbacks: FC<TCashbacksProps> = ({
    setError,
}) => {
    const {
        data = [],
        isError,
        isSuccess,
    } = useGetCashbacksQuery(null);

    const period = useSelector(getPeriod);
    const currentMonthCashbacks = useSelector(getCurrentMonthCashbacks);
    const nextMonthCashbacks = useSelector(getNextMonthCashbacks);
    const isLoading = useSelector(getIsLoading);
    const view = useSelector(getCashbacksView);

    const [cashbacks, setCashbacks] = useState([]);

    useEffect(() => {
        if (!isError) return;
        showErrorSnackbar(CASHBACKS_ERROR);
        setError(true);
    }, [isError]);

    useEffect(() => {
        setCashbacks(period === ECashbackPeriod.CURRENT_MONTH ? currentMonthCashbacks : nextMonthCashbacks);
    }, [currentMonthCashbacks, nextMonthCashbacks, period]);

    return <Stack spacing={1.5} flexGrow={1}>
        {!isError && <CashbacksHeader/>}
        {isLoading ?
            Array(CASHBACKS_FAKE_COUNT).fill('').map((item, idx) => (
                <Skeleton
                    key={idx}
                    variant={'rectangular'}
                    animation={'wave'}
                    height={theme.spacing(6)}
                />
            ))
            : <>
                {!cashbacks.length && <>
                    {isError ?
                        <Button
                            variant={'outlined'}
                            startIcon={<ReplayIcon />}
                            sx={buttonStyle}
                            onClick={() => location.reload()}
                        >
                            {CASHBACKS_RELOAD}
                        </Button>
                        : <Typography variant={'h5'} sx={emptyStyle}>{CASHBACKS_EMPTY}</Typography>
                    }
                </>
                }
                {view === ECashbacksView.BANK ?
                    <CashbacksBankView cashbacks={cashbacks} />
                    : <CashbacksDefaultView cashbacks={cashbacks} />
                }
            </>
        }
    </Stack>;
}

const centeredStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
};

const buttonStyle = {
    ...centeredStyle,
    fontWeight: 300,
};

const emptyStyle = {
    ...centeredStyle,
    opacity: 0.2,
    fontWeight: 300,
    userSelect: 'none',
};
