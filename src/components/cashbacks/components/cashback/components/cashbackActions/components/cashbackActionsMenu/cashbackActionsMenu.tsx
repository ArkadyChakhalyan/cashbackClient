import React, { FC, useEffect } from 'react';
import { TCashbackActionsMenuProps } from './types.ts';
import {
    CASHBACK_ACTIONS_DELETE,
    CASHBACK_ACTIONS_EDIT,
    CASHBACK_ACTIONS_MOVE,
    CASHBACK_ACTIONS_MOVE_SHORT,
    CASHBACK_ACTIONS_MOVE_SUCCESS
} from './constants.ts';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../../../../../../../store/types.ts';
import { getCashback } from '../../../../../../../../store/cashbackApi/selectors/getCashback.ts';
import { getNextMonthCashbacks } from '../../../../../../../../store/cashbackApi/selectors/getNextMonthCashbacks.ts';
import { getPeriod } from '../../../../../../../../store/cashbacks/selectors/getPeriod.ts';
import { setEditingCashbackIdAC } from '../../../../../../../../store/cashbacks/cashbackReducer.ts';
import { getBankOrderNumber } from '../../../../../../../../selectors/getBankOrderNumber.ts';
import { getOrderNumber } from '../../../../../../../../selectors/getOrderNumber.ts';
import { getNextMonthDate } from '../../../../../../../../selectors/getNextMonthDate.ts';
import { showErrorSnackbar } from '../../../../../../../snackbarStack/helpers/showErrorSnackbar.ts';
import { TMenuItemProps } from '../../../../../../../menu/menuItem/types.ts';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { getIsShowNextMonth } from '../../../../../../../../selectors/getIsShowNextMonth.ts';
import { ECashbackPeriod } from '../../../../../../../../types.ts';
import { getIsCashbackExist } from '../../../../../../../../selectors/getIsCashbackExist.ts';
import EventRepeatRoundedIcon from '@mui/icons-material/EventRepeatRounded';
import { showSuccessSnackbar } from '../../../../../../../snackbarStack/helpers/showSuccessSnackbar.ts';
import {
    useCreateCashbackMutation,
    useDeleteCashbackMutation
} from '../../../../../../../../store/cashbackApi/cashbackApiSlice.ts';
import { Menu } from '../../../../../../../menu/menu.tsx';
import { theme } from '../../../../../../../../style/theme.ts';
import { getSameCashback } from '../../../../../../../../selectors/getSameCashback.ts';
import { getCardOrderNumber } from '../../../../../../../../selectors/getCardOrderNumber.ts';

export const CashbackActionsMenu: FC<TCashbackActionsMenuProps> = ({
    anchor,
    id,
    onClose,
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

    const cashback = useSelector((state: IState) => getCashback(state, id));
    const nextMonthCashbacks = useSelector(getNextMonthCashbacks);
    const period = useSelector(getPeriod);

    const onEdit = () => {
        dispatch(setEditingCashbackIdAC(id));
    };

    const onCreate = () => {
        const {
            name,
            percentage,
            bank,
            card,
        } = cashback;
        try {
            createCashback({
                bank,
                bankOrderNumber: getBankOrderNumber(nextMonthCashbacks, bank),
                cardOrderNumber: getCardOrderNumber(nextMonthCashbacks, card, bank),
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
            if (period === ECashbackPeriod.CURRENT_MONTH) {
                const nextMonthCashback = getSameCashback(nextMonthCashbacks, cashback);
                if (!nextMonthCashback) return;
                deleteCashback({ id: nextMonthCashback.id });
            }
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

    return <Menu
        anchorEl={anchor}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ mt: 1.5, ml: 1 }}
        keepMounted
        slotProps={{
            paper: { sx: { minWidth: theme.spacing(18) }},
        }}
        open={!!anchor}
        onClose={onClose}
        items={actions}
    />;
}
