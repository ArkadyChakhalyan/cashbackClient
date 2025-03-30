import { Grow, IconButton, Skeleton, Tooltip } from '@mui/material';
import { useUpdateUserMutation } from '../../../../../../../../store/userApi/userApiSlice.ts';
import { getCashbacksView } from '../../../../../../../../store/userApi/selectors/getCashbacksView.ts';
import { useSelector } from 'react-redux';
import { theme } from '../../../../../../../../style/theme.ts';
import { getIsLoading } from '../../../../../../../../store/cashbackApi/selectors/getIsLoading.ts';
import { VIEW_TYPE_OPTIONS } from './constants.ts';
import { getPeriod } from '../../../../../../../../store/cashbacks/selectors/getPeriod.ts';
import {
    getCurrentMonthCashbacks
} from '../../../../../../../../store/cashbackApi/selectors/getCurrentMonthCashbacks.ts';
import { getNextMonthCashbacks } from '../../../../../../../../store/cashbackApi/selectors/getNextMonthCashbacks.ts';
import React, { useEffect, useState } from 'react';
import { ECashbackPeriod } from '../../../../../../../../types.ts';
import { getIsSearchMode } from '../../../../../../../../store/cashbacks/selectors/getIsSearchMode.ts';
import { CASHBACK_HEADER_HIDE_TIMEOUT } from '../../../../constants.ts';
import { showSuccessSnackbar } from '../../../../../../../snackbarStack/helpers/showSuccessSnackbar.ts';

export const ViewType = () => {
    const [updateUser, {
        isLoading: isUserLoading,
        isError,
        isSuccess,
        reset,
    }] = useUpdateUserMutation();

    const period = useSelector(getPeriod);
    const currentMonthCashbacks = useSelector(getCurrentMonthCashbacks);
    const nextMonthCashbacks = useSelector(getNextMonthCashbacks);
    const view = useSelector(getCashbacksView);
    const isLoading = useSelector(getIsLoading);
    const isSearchMode = useSelector(getIsSearchMode);

    const { nextView, icon, tooltip } = VIEW_TYPE_OPTIONS[view];

    const onChange = () => {
        if (isUserLoading) return;
        updateUser({ cashbacksView: nextView });
        showSuccessSnackbar(VIEW_TYPE_OPTIONS[nextView].tooltip);
        reset();
    };

    const [isShow, setShow] = useState(null);

    useEffect(() => {
        setShow(period === ECashbackPeriod.CURRENT_MONTH ?
            !!currentMonthCashbacks.length
            : !!nextMonthCashbacks.length
        );
    }, [period, currentMonthCashbacks, nextMonthCashbacks]);

    const Icon = icon;

    return <>
        {isLoading ?
            <Skeleton variant={'circular'} width={theme.spacing(5)} height={theme.spacing(5)} />
            : isShow ?
                <Tooltip title={tooltip}>
                    <Grow appear={false} in={!isSearchMode} timeout={CASHBACK_HEADER_HIDE_TIMEOUT}>
                        <IconButton onClick={onChange}>
                            <Icon sx={{ width: theme.spacing(3.25), height: theme.spacing(3.25) }} />
                        </IconButton>
                    </Grow>
                </Tooltip>
                : null
        }
    </>;
}
