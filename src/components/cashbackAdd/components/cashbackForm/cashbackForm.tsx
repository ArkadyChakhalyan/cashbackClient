import React, { FC, useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { TCashbackFormProps } from './types.ts';
import DataSaverOnRoundedIcon from '@mui/icons-material/DataSaverOnRounded';
import {
    CASHBACK_FORM_ADD,
    CASHBACK_FORM_ADD_TITLE,
    CASHBACK_FORM_EDIT,
    CASHBACK_FORM_EDIT_TITLE,
    getCashbackErrorText,
} from './constants.ts';
import { LoadingButton } from '@mui/lab';
import { CashbackFormName } from './components/cashbackFormName/cashbackFormName.tsx';
import { CashbackAddModalPercentage } from './components/cashbackFormPercentage/cashbackAddModalPercentage.tsx';
import { CashbackFormPeriod } from './components/cashbackFormPeriod/cashbackFormPeriod.tsx';
import {
    useCreateCashbackMutation,
    useUpdateCashbackMutation
} from '../../../../store/cashbackApi/cashbackApiSlice.ts';
import { Modal } from '../../../modal/modal.tsx';
import { theme } from '../../../../style/theme.ts';
import { CashbackFormBank } from './components/cashbackFormBank/cashbackFormBank.tsx';
import { getEditingCashback } from '../../../../store/cashbacks/selectors/getEditingCashback.ts';
import { useSelector } from 'react-redux';
import { EBank, ICashback } from 'cashback-check-types';
import { showErrorSnackbar } from '../../../snackbarStack/helpers/showErrorSnackbar.ts';
import { getCashbackPeriod } from '../../../../selectors/getCashbackPeriod.ts';
import { ECashbackPeriod } from '../../../../types.ts';
import { getIsCashbackExist } from '../../../../selectors/getIsCashbackExist.ts';
import { getCurrentMonthCashbacks } from '../../../../store/cashbackApi/selectors/getCurrentMonthCashbacks.ts';
import { getNextMonthCashbacks } from '../../../../store/cashbackApi/selectors/getNextMonthCashbacks.ts';
import { getIsShowNextMonth } from '../../../../selectors/getIsShowNextMonth.ts';
import { MONTH_MAP } from '../../../../constants.ts';
import { getBankOrderNumber } from '../../../../selectors/getBankOrderNumber.ts';
import { getOrderNumber } from '../../../../selectors/getOrderNumber.ts';

export const CashbackForm: FC<TCashbackFormProps> = ({
    isOpen,
    onClose,
}) => {
    const [createCashback, {
        isLoading: isCreateLoading,
        isError: isCreateError,
        isSuccess: isCreateSuccess,
        reset: createReset,
    }] = useCreateCashbackMutation();

    const [updateCashback, {
        isLoading: isUpdateLoading,
        isError: isUpdateError,
        isSuccess: isUpdateSuccess,
        reset: updateReset,
    }] = useUpdateCashbackMutation();

    const cashback = useSelector(getEditingCashback);
    const currentMonthCashbacks = useSelector(getCurrentMonthCashbacks);
    const nextMonthCashbacks = useSelector(getNextMonthCashbacks);

    const [name, setName] = useState('');
    const [timestamp, setTimestamp] = useState(null);
    const [bank, setBank] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [isError, setError] = useState(null);

    const isShowNextMonth = getIsShowNextMonth();

    const isDisabled = !name || !name.trim() || !percentage || !bank || isError;
    const isNotChanged = cashback && cashback.name === name && cashback.bank === bank && cashback.percentage === percentage;

    const onAdd = () => {
        if (isDisabled || isNotChanged) return;

        const data: Partial<ICashback> = {
            name: name.trim(),
            bank,
            percentage,
            timestamp: timestamp || Date.now(),
        };

        const period = getCashbackPeriod(data.timestamp);
        const cashbacks = period === ECashbackPeriod.NEXT_MONTH ? nextMonthCashbacks : currentMonthCashbacks;

        if (!cashback && getIsCashbackExist(cashbacks, data)) {
            setError(true);
            let error;
            const monthIndex = new Date(data.timestamp).getMonth();
            const month = MONTH_MAP[monthIndex];
            if (getCashbackPeriod(timestamp) === ECashbackPeriod.CURRENT_MONTH) {
                error = getCashbackErrorText(month);
            } else if (getCashbackPeriod(timestamp) === ECashbackPeriod.NEXT_MONTH) {
                error = getCashbackErrorText(month);
            }
            showErrorSnackbar(error);
            return;
        }

        if (cashback) {
            updateCashback({
                id: cashback.id,
                ...data,
            });
        } else {
            const cashbacks = !timestamp || getCashbackPeriod(timestamp) === ECashbackPeriod.CURRENT_MONTH ?
                currentMonthCashbacks : nextMonthCashbacks;
            data.orderNumber = getOrderNumber(cashbacks);
            data.bankOrderNumber = getBankOrderNumber(cashbacks, bank);
            createCashback(data);
        }
    };

    const onSetData = (
        name: string,
        percentage: number,
        bank: EBank,
        timestamp?: number,
    ) => {
        setName(name);
        setPercentage(percentage);
        setBank(bank);
        if (timestamp) {
            setTimestamp(timestamp);
        }
    };

    useEffect(() => {
        if (!isCreateSuccess && !isUpdateSuccess) return;
        onClose();
        createReset();
        updateReset();
    }, [isCreateSuccess, isUpdateSuccess]);

    useEffect(() => {
        if (!cashback) return;
        const { name, percentage, bank, timestamp} = cashback;
        onSetData(name, percentage, bank, timestamp);
    }, [cashback]);

    useEffect(() => {
        if (isOpen) return;
        onSetData('', 0, null);
    }, [isOpen]);

    useEffect(() => {
        if (!isCreateError && !isUpdateError) return;
        showErrorSnackbar();
    }, [isCreateError, isUpdateError]);

    useEffect(() => {
        setError(false);
    }, [timestamp, name, bank, percentage]);

    return <Modal
        isOpen={isOpen}
        onClose={onClose}
        onKeyDown={e => {
            if (e.key === 'Enter') {
                onAdd();
            }
        }}
        body={<>
            <Stack alignItems={'center'} spacing={1.5}>
                <DataSaverOnRoundedIcon sx={iconStyle} />
                <Typography variant={'h6'} fontWeight={300}>
                    {cashback ? CASHBACK_FORM_EDIT_TITLE : CASHBACK_FORM_ADD_TITLE}
                </Typography>
            </Stack>
            <Stack gap={2} sx={{ maxWidth: '100%' }}>
                {!cashback && isShowNextMonth &&
                    <CashbackFormPeriod
                        period={timestamp}
                        setPeriod={setTimestamp}
                    />
                }
                <CashbackFormBank bank={bank} isOpen={isOpen} setBank={setBank} />
                <CashbackFormName name={name} setName={setName} />
                <CashbackAddModalPercentage percentage={percentage} setPercentage={setPercentage} />
            </Stack>
            <LoadingButton
                sx={addStyle}
                loading={isCreateLoading || isUpdateLoading}
                onClick={onAdd}
                disabled={isDisabled || isNotChanged}
            >
                {cashback ? CASHBACK_FORM_EDIT : CASHBACK_FORM_ADD}
            </LoadingButton>
        </>}
    />;
}

const iconStyle = {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: theme.palette.green.main,
};

const addStyle = {
    width: theme.spacing(28),
    maxWidth: '100%',
    mt: 1,
    fontWeight: 400,
};
