import React, { FC, useEffect, useRef, useState } from 'react';
import { alpha, Button, Stack, Typography } from '@mui/material';
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
import { CashbackFormPercentage } from './components/cashbackFormPercentage/cashbackFormPercentage.tsx';
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
import { getCardOrderNumber } from '../../../../selectors/getCardOrderNumber.ts';

export const CashbackForm: FC<TCashbackFormProps> = ({
    isOpen,
    onClose,
}) => {
    // const { showEvent } = useEvent();

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
    const [card, setCard] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [isError, setError] = useState(null);
    const [isAddMore, setAddMore] = useState(null);

    const addRef = useRef(null);

    const isShowNextMonth = getIsShowNextMonth();

    const isDisabled = !name || !name.trim() || !percentage || !bank || isError;
    const isNotChanged = cashback &&
        cashback.name === name &&
        cashback.bank === bank &&
        cashback.percentage === percentage &&
        cashback?.card?.name === card?.name;

    const onAdd = (
        isAddMore: boolean = false,
        e?: React.MouseEvent,
    ) => {
        if (isDisabled || isNotChanged) return;

        const data: Partial<ICashback> = {
            name: name.trim(),
            bank,
            card,
            percentage,
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
        } else {
            const cashbacks = !timestamp || getCashbackPeriod(timestamp) === ECashbackPeriod.CURRENT_MONTH ?
                currentMonthCashbacks : nextMonthCashbacks;
            data.orderNumber = getOrderNumber(cashbacks);
            data.bankOrderNumber = getBankOrderNumber(cashbacks, bank);
            data.cardOrderNumber = getCardOrderNumber(cashbacks, card, bank);
            createCashback(data);
            // if (e) {
            //     showEvent(e.clientX, e.clientY, CASHBACK_FORM_ADDED_EVENT);
            // }
        }

        if (isAddMore) {
            onSetData('', percentage, bank, card, timestamp);
        }
    };

    const onAddMore = (e: React.MouseEvent) => {
        setAddMore(true);
        onAdd(true, e);
    };

    const onSetData = (
        name: string,
        percentage: number,
        bank: EBank,
        card: ICard,
        timestamp?: number,
    ) => {
        setName(name);
        setPercentage(percentage);
        setBank(bank);
        setCard(card);
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
        const { name, percentage, bank, card, timestamp} = cashback;
        onSetData(name, percentage, bank, card, timestamp);
    }, [cashback]);

    useEffect(() => {
        if (isOpen) return;
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
                <Typography variant={'h5'} fontWeight={300}>
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
                    period={getCashbackPeriod(timestamp)}
                    setBank={setBank}
                    setCard={setCard}
                />
                <CashbackFormName
                    name={name}
                    bank={bank}
                    setName={setName}
                />
                <CashbackFormPercentage percentage={percentage} setPercentage={setPercentage} />
            </Stack>
            <Stack gap={0.5} alignItems={'center'} sx={addWrapperStyle}>
                <LoadingButton
                    ref={addRef}
                    sx={addStyle}
                    onClick={(e) => {
                        onAdd(false, e);
                    }}
                    loading={isCreateLoading || isUpdateLoading}
                    disabled={isDisabled || isNotChanged}
                >
                    {cashback ? CASHBACK_FORM_EDIT : CASHBACK_FORM_ADD}
                </LoadingButton>

                <Stack height={theme.spacing(3)} mt={0.75}>
                    {!cashback && !isDisabled && !isNotChanged && !isCreateLoading && !isUpdateLoading &&
                        <Button
                            sx={addMoreStyle}
                            variant={'text'}
                            onClick={onAddMore}
                        >
                            {CASHBACK_FORM_ADD_MORE}
                        </Button>
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
    color: alpha(theme.palette.common.white, 0.75),
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
    bgcolor: alpha(theme.palette.primary.main, 0.85),
    '&:hover,&:focus': {
        bgcolor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
        height: theme.spacing(6.5),
    }
};

const addWrapperStyle = {
    mt: 1,
};

const addMoreStyle = {
    height: theme.spacing(3.5),
    fontWeight: 300,
    background: 'none !important',
    backdropFilter: 'none',
    fontSize: theme.typography.body2.fontSize,
    opacity: 0.6,
    boxShadow: 'none !important',
    '&:hover, &:focus': {
        opacity: 0.8,
    }
};
