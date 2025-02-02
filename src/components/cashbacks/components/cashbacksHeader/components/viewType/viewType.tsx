import { IconButton, Skeleton, Tooltip } from '@mui/material';
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import ViewHeadlineRoundedIcon from '@mui/icons-material/ViewHeadlineRounded';
import { useUpdateUserMutation } from '../../../../../../store/userApi/userApiSlice.ts';
import { ECashbacksView } from 'cashback-check-types';
import { getCashbacksView } from '../../../../../../store/userApi/selectors/getCashbacksView.ts';
import { useSelector } from 'react-redux';
import { theme } from '../../../../../../style/theme.ts';
import { getIsLoading } from '../../../../../../store/cashbackApi/selectors/getIsLoading.ts';
import { VIEW_TYPE_BANK_VIEW_TOOLTIP, VIEW_TYPE_DEFAULT_VIEW_TOOLTIP } from './constants.ts';
import { getPeriod } from '../../../../../../store/cashbacks/selectors/getPeriod.ts';
import { getCurrentMonthCashbacks } from '../../../../../../store/cashbackApi/selectors/getCurrentMonthCashbacks.ts';
import { getNextMonthCashbacks } from '../../../../../../store/cashbackApi/selectors/getNextMonthCashbacks.ts';
import { useEffect, useState } from 'react';
import { ECashbackPeriod } from '../../../../../../types.ts';

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

    const isDefaultView = view === ECashbacksView.DEFAULT;

    const onChange = () => {
        if (isUserLoading) return;
        const cashbacksView = isDefaultView ? ECashbacksView.BANK : ECashbacksView.DEFAULT;
        updateUser({ cashbacksView });
        reset();
    };

    const [isShow, setShow] = useState(null);

    useEffect(() => {
        setShow(period === ECashbackPeriod.CURRENT_MONTH ?
            !!currentMonthCashbacks.length
            : !!nextMonthCashbacks.length
        );
    }, [period, currentMonthCashbacks, nextMonthCashbacks]);

    return <>
        {isLoading ?
            <Skeleton variant={'circular'} width={theme.spacing(5)} height={theme.spacing(5)} />
            : isShow ?
                <Tooltip title={isDefaultView ? VIEW_TYPE_DEFAULT_VIEW_TOOLTIP : VIEW_TYPE_BANK_VIEW_TOOLTIP}>
                    <IconButton onClick={onChange}>
                        {view === ECashbacksView.DEFAULT ?
                            <ViewStreamRoundedIcon />
                            : <ViewHeadlineRoundedIcon sx={{ width: theme.spacing(3.25), height: theme.spacing(3.25) }} />
                        }
                    </IconButton>
                </Tooltip>
                : null
        }
    </>;
}
