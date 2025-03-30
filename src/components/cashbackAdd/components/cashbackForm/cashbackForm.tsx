import React, { FC, useEffect, useRef, useState } from 'react';
import { alpha, Stack, Typography } from '@mui/material';
import { TCashbackFormProps } from './types.ts';
import DataSaverOnRoundedIcon from '@mui/icons-material/DataSaverOnRounded';
import {
    CASHBACK_FORM_ADD,
    CASHBACK_FORM_ADD_MORE,
    CASHBACK_FORM_ADD_TITLE,
    CASHBACK_FORM_ADDED,
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
    useDeleteCashbackMutation,
    useUpdateCashbackMutation
} from '../../../../store/cashbackApi/cashbackApiSlice.ts';
import { Modal } from '../../../modal/modal.tsx';
import { theme } from '../../../../style/theme.ts';
import { CashbackFormBank } from './components/cashbackFormBank/cashbackFormBank.tsx';
import { getEditingCashback } from '../../../../store/cashbacks/selectors/getEditingCashback.ts';
import { useSelector } from 'react-redux';
import { EBank, ICard, ICashback } from 'cashback-check-types';
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
import { showSuccessSnackbar } from '../../../snackbarStack/helpers/showSuccessSnackbar.ts';
import { getNextMonthDate } from '../../../../selectors/getNextMonthDate.ts';
import { getCardOrderNumber } from '../../../../selectors/getCardOrderNumber.ts';

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

    const [deleteCashback, {
        isLoading: isDeleteLoading,
        isError: isDeleteError,
        isSuccess: isDeleteSuccess,
    }] = useDeleteCashbackMutation();

    const cashback = useSelector(getEditingCashback);
    const currentMonthCashbacks = useSelector(getCurrentMonthCashbacks);
    const nextMonthCashbacks = useSelector(getNextMonthCashbacks);

    const [name, setName] = useState('');
    const [timestamp, setTimestamp] = useState(null);
    const [bank, setBank] = useState(null);
    const [card, setCard] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [limitless, setLimitless] = useState(null);
    const [isError, setError] = useState(null);
    let [progress, _setProgress] = useState(0);
    let [isAddMore, _setAddMore] = useState(null);
    const [isPressed, setPressed] = useState(null);

    const setProgress = (value: number) => {
        progress = value;
        _setProgress(value);
    };

    const setAddMore = (value: boolean) => {
        isAddMore = value;
        _setAddMore(value);
    };

    const addRef = useRef(null);
    const timerRef = useRef(null);
    const intervalRef = useRef(null);


    const isShowNextMonth = getIsShowNextMonth();

    const isDisabled = !name || !name.trim() || !percentage || !bank || isError;
    const isNotChanged = cashback &&
        cashback.name === name &&
        cashback.bank === bank &&
        cashback.percentage === percentage &&
        cashback?.card?.name === card?.name &&
        !!cashback.limitless === !!limitless;

    const onAdd = () => {
        if (isDisabled || isNotChanged) return;

        resetLongPress(false);

        const data: Partial<ICashback> = {
            name: name.trim(),
            bank,
            card,
            percentage,
            limitless,
            timestamp: timestamp || Date.now(),
        };

        const period = getCashbackPeriod(data.timestamp);
        const cashbacks = period === ECashbackPeriod.NEXT_MONTH ? nextMonthCashbacks : currentMonthCashbacks;

        if (!cashback && getIsCashbackExist(cashbacks, data)) {
            setError(true);
            const monthIndex = new Date(data.timestamp).getMonth();
            const month = MONTH_MAP[monthIndex];
            showErrorSnackbar(getCashbackErrorText(month));
            return;
        }

        if (cashback) {
            updateCashback({
                id: cashback.id,
                ...data,
            });
            if (
                !getIsCashbackExist(nextMonthCashbacks, cashback) &&
                period === ECashbackPeriod.CURRENT_MONTH
            ) {
                createCashback({
                    ...data,
                    bankOrderNumber: getBankOrderNumber(nextMonthCashbacks, bank),
                    cardOrderNumber: getCardOrderNumber(nextMonthCashbacks, card, bank),
                    orderNumber: getOrderNumber(nextMonthCashbacks),
                    timestamp: getNextMonthDate().getTime(),
                });
            } else if (cashback.limitless) {
                const cashbacks = period === ECashbackPeriod.CURRENT_MONTH ? nextMonthCashbacks : currentMonthCashbacks;
                const cashbackToUpdate = cashbacks.find(item => {
                    return item.bank === cashback.bank &&
                        item.name === cashback.name &&
                        item.card?.name === cashback.card?.name &&
                        item.percentage === cashback.percentage &&
                        !!item.limitless === !!cashback.limitless;
                });
                if (!data.limitless) {
                    deleteCashback({ id: cashbackToUpdate.id });
                } else {
                    updateCashback({
                        ...data,
                        id: cashbackToUpdate.id,
                        bankOrderNumber: cashbackToUpdate.bankOrderNumber,
                        cardOrderNumber: cashbackToUpdate.cardOrderNumber,
                        orderNumber: cashbackToUpdate.orderNumber,
                        timestamp: cashbackToUpdate.timestamp,
                    });
                }
            }
        } else {
            const cashbacks = !timestamp || getCashbackPeriod(timestamp) === ECashbackPeriod.CURRENT_MONTH ?
                currentMonthCashbacks : nextMonthCashbacks;
            data.orderNumber = getOrderNumber(cashbacks);
            data.bankOrderNumber = getBankOrderNumber(cashbacks, bank);
            data.cardOrderNumber = getCardOrderNumber(cashbacks, card, bank);
            createCashback(data);
            if (limitless && period === ECashbackPeriod.CURRENT_MONTH) {
                createCashback({
                    ...data,
                    bankOrderNumber: getBankOrderNumber(nextMonthCashbacks, bank),
                    cardOrderNumber: getCardOrderNumber(nextMonthCashbacks, card, bank),
                    orderNumber: getOrderNumber(nextMonthCashbacks),
                    timestamp: getNextMonthDate().getTime(),
                });
            }
        }

        if (isAddMore) {
            onSetData('', percentage, bank, card, limitless, timestamp);
        }
    };

    const resetLongPress = (
        resetPress: boolean = true,
    ) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (resetPress) setPressed(false);
        setProgress(0);

        document.removeEventListener('mousemove', onTrackPointer);
        document.removeEventListener('touchmove', onTrackPointer);
    };

    const onTrackPointer = (e: MouseEvent | TouchEvent) => {
        let x, y;
        if (e instanceof MouseEvent) {
            x = e.clientX;
            y = e.clientY;
        } else if (e instanceof TouchEvent) {
            const touch = e.touches[0];
            x = touch.clientX;
            y = touch.clientY;
        }

        const elementUnderPointer = document.elementFromPoint(x, y);
        if (elementUnderPointer !== addRef.current) {
            resetLongPress();
        }
    };

    const onLongPress = () => {
        if (cashback) return;

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setPressed(true);
            setProgress(0);

            if (intervalRef.current) clearInterval(intervalRef.current);

            document.addEventListener('mousemove', onTrackPointer);
            document.addEventListener('touchmove', onTrackPointer);
            intervalRef.current = setInterval(() => {
                if (progress === 100) {
                    setAddMore(true);
                    onAdd();
                } else {
                    setProgress(progress + 5);
                }
            }, 30);
        }, 250);
    };

    const onMouseUp = () => {
        const _isPressed = isPressed;
        resetLongPress();
        if (progress === 100 || _isPressed) return;
        onAdd();
    };

    const onSetData = (
        name: string,
        percentage: number,
        bank: EBank,
        card: ICard,
        limitless: boolean,
        timestamp?: number,
    ) => {
        setName(name);
        setPercentage(percentage);
        setBank(bank);
        setCard(card);
        setLimitless(limitless);
        if (timestamp) {
            setTimestamp(timestamp);
        }
    };

    useEffect(() => {
        if (!isCreateSuccess && !isUpdateSuccess) return;

        if (isAddMore) {
            showSuccessSnackbar(CASHBACK_FORM_ADDED);
            setAddMore(false);
        } else {
            onClose();
        }

        createReset();
        updateReset();
    }, [isCreateSuccess, isUpdateSuccess]);

    useEffect(() => {
        if (!cashback) return;
        const { name, percentage, bank, card, timestamp, limitless} = cashback;
        onSetData(name, percentage, bank, card, limitless, timestamp);
    }, [cashback]);

    useEffect(() => {
        if (isOpen) return;
        resetLongPress();
        onSetData('', 0, null, null, null);
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
            <Stack alignItems={'center'} sx={headerStyle}>
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
                <CashbackFormBank
                    bank={bank}
                    card={card}
                    isOpen={isOpen}
                    setBank={setBank}
                    setCard={setCard}
                />
                <CashbackFormName
                    name={name}
                    limitless={limitless}
                    setName={setName}
                    setLimitless={setLimitless}
                />
                <CashbackAddModalPercentage percentage={percentage} setPercentage={setPercentage} />
            </Stack>
            <Stack gap={0.5} alignItems={'center'} sx={addWrapperStyle}>
                <LoadingButton
                    ref={addRef}
                    sx={addStyle}
                    onMouseDown={onLongPress}
                    onTouchStart={onLongPress}
                    onTouchEnd={onMouseUp}
                    onMouseUp={onMouseUp}
                    loading={!progress && (isCreateLoading || isUpdateLoading)}
                    disabled={isDisabled || isNotChanged}
                >
                    {!cashback && <Stack sx={{ ...progressStyle, width: `${progress}%` }} />}
                    {cashback ? CASHBACK_FORM_EDIT : CASHBACK_FORM_ADD}
                </LoadingButton>
                <Stack height={theme.spacing(2.5)}>
                    {!cashback && !isDisabled && !isNotChanged && !isCreateLoading && !isUpdateLoading &&
                        <Typography variant={'caption'} sx={textStyle}>
                            {CASHBACK_FORM_ADD_MORE}
                        </Typography>
                    }
                </Stack>
            </Stack>
        </>}
    />;
}

const headerStyle = {
    gap: 1.5,
    [theme.breakpoints.down('sm')]: {
        gap: 0.5,
    }
};

const iconStyle = {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: theme.palette.green.main,
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
};

const addStyle = {
    width: theme.spacing(28),
    maxWidth: '100%',
    fontWeight: 400,
    overflow: 'hidden',
    pointerEvents: 'all',
    '.MuiLoadingButton-label': {
        pointerEvents: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        height: theme.spacing(6.5),
    }
};

const addWrapperStyle = {
    mt: 1,
    pointerEvents: 'none',
};

const progressStyle = {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    width: 0,
    bgcolor: alpha(theme.palette.common.white, 0.08),
    zIndex: 10,
};

const textStyle = {
    opacity: 0.5,
};
