import React, { FC, useEffect, useState } from 'react';
import { alpha, IconButton } from '@mui/material';
import { TCashbackActionsProps } from './types.ts';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {
    useCreateCashbackMutation,
    useDeleteCashbackMutation
} from '../../../../../store/cashbackApi/cashbackApiSlice.ts';
import { theme } from '../../../../../style/theme.ts';
import {
    CASHBACK_ACTIONS_DELETE,
    CASHBACK_ACTIONS_EDIT,
    CASHBACK_ACTIONS_MOVE,
    CASHBACK_ACTIONS_MOVE_SHORT,
    CASHBACK_ACTIONS_MOVE_SUCCESS
} from './constants.ts';
import { Menu } from '../../../../menu/menu.tsx';
import { setEditingCashbackIdAC } from '../../../../../store/cashbacks/cashbackReducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../../../../store/types.ts';
import { showErrorSnackbar } from '../../../../snackbarStack/helpers/showErrorSnackbar.ts';
import { showSuccessSnackbar } from '../../../../snackbarStack/helpers/showSuccessSnackbar.ts';
import { getNextMonthCashbacks } from '../../../../../store/cashbackApi/selectors/getNextMonthCashbacks.ts';
import { getIsCashbackExist } from '../../../../../selectors/getIsCashbackExist.ts';
import { getIsShowNextMonth } from '../../../../../selectors/getIsShowNextMonth.ts';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import EventRepeatRoundedIcon from '@mui/icons-material/EventRepeatRounded';
import { TMenuItemProps } from '../../../../menu/menuItem/types.ts';
import { getCashbacksView } from '../../../../../store/userApi/selectors/getCashbacksView.ts';
import { ECashbacksView } from 'cashback-check-types/user';
import { getNextMonthDate } from '../../../../../selectors/getNextMonthDate.ts';
import { ECashbackPeriod } from '../../../../../types.ts';
import { getPeriod } from '../../../../../store/cashbacks/selectors/getPeriod.ts';
import { getCashback } from '../../../../../store/cashbackApi/selectors/getCashback.ts';
import { getOrderNumber } from '../../../../../selectors/getOrderNumber.ts';
import { getBankOrderNumber } from '../../../../../selectors/getBankOrderNumber.ts';

export const CashbackActions: FC<TCashbackActionsProps> = ({
    id,
}) => {
    const dispatch = useDispatch();

    const [createCashback, {
        isLoading: isCreateLoading,
        isError: isCreateError,
        isSuccess: isCreateSuccess,
    }] = useCreateCashbackMutation();

    const [deleteCashback, {
        isLoading: isDeleteLoading,
        isError: isDeleteError,
        isSuccess: isDeleteSuccess,
    }] = useDeleteCashbackMutation();
    const [anchor, setAnchor] = useState(null);

    const cashback = useSelector((state: IState) => getCashback(state, id));
    const nextMonthCashbacks = useSelector(getNextMonthCashbacks);
    const view = useSelector(getCashbacksView);
    const period = useSelector(getPeriod);

    const onEdit = () => {
        dispatch(setEditingCashbackIdAC(id));
    };

    const onCreate = () => {
        const {
            name,
            percentage,
            bank,
        } = cashback;
        try {
            createCashback({
                bank,
                bankOrderNumber: getBankOrderNumber(nextMonthCashbacks, bank),
                name,
                percentage,
                orderNumber: getOrderNumber(nextMonthCashbacks),
                timestamp: getNextMonthDate().getTime(),
            });
        } catch {
            showErrorSnackbar();
        }
    };

    const onDelete = () => {
        try {
            deleteCashback({ id });
        } catch {
            showErrorSnackbar();
        }
    };

    const actions: TMenuItemProps[] = [
        {
            label: CASHBACK_ACTIONS_EDIT,
            icon: CreateRoundedIcon,
            onClick: onEdit,
        },
        {
            label: CASHBACK_ACTIONS_DELETE,
            icon: DeleteRoundedIcon,
            isDivided: true,
            onClick: onDelete,
        },
    ];

    if (
        getIsShowNextMonth() &&
        period === ECashbackPeriod.CURRENT_MONTH &&
        cashback &&
        !getIsCashbackExist(nextMonthCashbacks, cashback)
    ) {
        actions.unshift({
            label: CASHBACK_ACTIONS_MOVE,
            shortLabel: CASHBACK_ACTIONS_MOVE_SHORT,
            icon: EventRepeatRoundedIcon,
            onClick: onCreate,
        });
    }

    useEffect(() => {
        if (!isCreateSuccess) return;
        showSuccessSnackbar(CASHBACK_ACTIONS_MOVE_SUCCESS);
    }, [isCreateSuccess]);

    useEffect(() => {
        if (!isDeleteError && !isCreateError) return;
        showErrorSnackbar();
    }, [isDeleteError, isCreateError]);

    return <>
        <IconButton
            sx={{
                ...actionsStyle,
                bgcolor: view === ECashbacksView.BANK ? alpha(theme.palette.common.white, 0.05) : null
            }}
            onClick={(e: React.MouseEvent) => setAnchor(e.currentTarget)}
        >
            <MoreHorizRoundedIcon />
        </IconButton>
        <Menu
            anchorEl={anchor}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{ mt: 1.5, ml: 1 }}
            keepMounted
            slotProps={{
                paper: { sx: { minWidth: theme.spacing(18) } },
            }}
            open={!!anchor}
            onClose={() => setAnchor(null)}
            items={actions}
        />
    </>;
}

const actionsStyle = {
    position: 'relative',
    width: theme.spacing(4),
    height: theme.spacing(4),
    '&:before': {
        content: '""',
        position: 'absolute',
        inset: theme.spacing(-0.5),
    }
};
