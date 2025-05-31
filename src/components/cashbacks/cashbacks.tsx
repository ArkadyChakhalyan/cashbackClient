import React, { FC, useEffect, useState } from 'react';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { CASHBACKS_EMPTY, CASHBACKS_ERROR, CASHBACKS_FAKE_COUNT, CASHBACKS_RELOAD } from './constants.ts';
import { useGetCashbacksQuery } from '../../store/cashbackApi/cashbackApiSlice.ts';
import { theme } from '../../style/theme.ts';
import { useDispatch, useSelector } from 'react-redux';
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
import { ECashbacksView } from 'cashback-check-types';
import { getSearchQuery } from '../../store/cashbacks/selectors/getSearchQuery.ts';
import { getIsSearchMode } from '../../store/cashbacks/selectors/getIsSearchMode.ts';
import { getOpenedActionsCashbackId } from '../../store/cashbacks/selectors/getOpenedActionsCashbackId.ts';
import {
    CashbackActionsMenu
} from './components/cashback/components/cashbackActions/components/cashbackActionsMenu/cashbackActionsMenu.tsx';
import { setOpenedActionsCashbackIdAC } from '../../store/cashbacks/cashbackReducer.ts';
import { CashbacksCardView } from './components/cashbacksCardView/cashbacksCardView.tsx';
import { useGetCardsQuery } from '../../store/cardApi/cardApiSlice.ts';
import { getCashbacks } from '../../store/cashbackApi/selectors/getCashbacks.ts';
import { getCashbackPeriod } from '../../selectors/getCashbackPeriod.ts';

export const Cashbacks: FC<TCashbacksProps> = ({
    setError,
}) => {
    const dispatch = useDispatch();

    const { isError: isCashbacksError } = useGetCashbacksQuery(null);
    const { isError: isCardsError,  } = useGetCardsQuery(null);

    const period = useSelector(getPeriod);
    const allCashbacks = useSelector(getCashbacks);
    const currentMonthCashbacks = useSelector(getCurrentMonthCashbacks);
    const nextMonthCashbacks = useSelector(getNextMonthCashbacks);
    const isLoading = useSelector(getIsLoading);
    const view = useSelector(getCashbacksView);
    const searchQuery = useSelector(getSearchQuery).toLowerCase().trim();
    const isSearchMode = useSelector(getIsSearchMode);
    const openedActionsCashbackId = useSelector(getOpenedActionsCashbackId);

    const [cashbacks, setCashbacks] = useState(null);

    useEffect(() => {
        if (!isCashbacksError) return;
        showErrorSnackbar(CASHBACKS_ERROR);
        setError(true);
    }, [isCashbacksError]);

    useEffect(() => {
        if (isLoading) return;
        let cashbacks = isSearchMode ? [...allCashbacks].sort((a, b) => getCashbackPeriod(a.timestamp) - getCashbackPeriod(b.timestamp))
            : period === ECashbackPeriod.NEXT_MONTH ? nextMonthCashbacks : currentMonthCashbacks;
        if (searchQuery) {
            cashbacks = cashbacks.filter(cashback => {
                return cashback.name.toLowerCase().includes(searchQuery) ||
                    cashback.card?.name.toLowerCase().includes(searchQuery);
            });
        }
        setCashbacks(cashbacks);
    }, [isLoading, currentMonthCashbacks, nextMonthCashbacks, period, searchQuery, isSearchMode]);

    return <Stack spacing={1.5} flexGrow={1}>
        {!isCashbacksError && <CashbacksHeader />}
        {isLoading || !cashbacks ?
            Array(CASHBACKS_FAKE_COUNT).fill('').map((item, idx) => (
                <Skeleton
                    key={idx}
                    variant={'rectangular'}
                    animation={'wave'}
                    height={theme.spacing(6)}
                />
            ))
            : <>
                {!cashbacks.length &&
                    <>
                        {isCashbacksError ?
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
                {(isSearchMode || view === ECashbacksView.DEFAULT) && <CashbacksDefaultView cashbacks={cashbacks} />}
                {!isSearchMode && view === ECashbacksView.BANK && <CashbacksBankView cashbacks={cashbacks} />}
                {!isSearchMode && view === ECashbacksView.CARD && <CashbacksCardView cashbacks={cashbacks} />}
                <CashbackActionsMenu
                    anchor={openedActionsCashbackId && document.createElement('div')}
                    id={openedActionsCashbackId}
                    onClose={() => dispatch(setOpenedActionsCashbackIdAC(null))}
                />
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
