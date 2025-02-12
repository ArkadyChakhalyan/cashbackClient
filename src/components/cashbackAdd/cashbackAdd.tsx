import React, { useEffect, useState } from 'react';
import { Button, Skeleton, Stack } from '@mui/material';
import { theme } from '../../style/theme.ts';
import { CASHBACK_ADD } from './constants.ts';
import { useDispatch, useSelector } from 'react-redux';
import { CashbackForm } from './components/cashbackForm/cashbackForm.tsx';
import { getEditingCashbackId } from '../../store/cashbacks/selectors/getEditingCashbackId.ts';
import { setEditingCashbackIdAC } from '../../store/cashbacks/cashbackReducer.ts';
import { getIsLoading } from '../../store/cashbackApi/selectors/getIsLoading.ts';
import { getIsSearchMode } from '../../store/cashbacks/selectors/getIsSearchMode.ts';
import { getIsNewIphonePWA } from '../../selectors/getIsNewIphonePWA.ts';

export const CashbackAdd = () => {
    const dispatch = useDispatch();

    const [isOpen, setOpen] = useState(false);
    const isLoading = useSelector(getIsLoading);
    const editingCashbackId = useSelector(getEditingCashbackId);
    const isSearchMode = useSelector(getIsSearchMode);

    const onClose = () => {
        if (editingCashbackId) {
            dispatch(setEditingCashbackIdAC(null));
        }
        setOpen(false);
    };

    useEffect(() => {
        if (editingCashbackId) {
            setOpen(true);
        }
    }, [editingCashbackId]);

    return <Stack alignItems={'center'}>
        <CashbackForm isOpen={isOpen} onClose={onClose} />
        {!isSearchMode &&
            <>
                {isLoading ?
                    <Skeleton
                        variant={'rectangular'}
                        animation={'wave'}
                        sx={{
                            ...buttonStyle,
                            height: theme.spacing(6),
                            bottom: theme.spacing(getIsNewIphonePWA() ? 5 : 3),
                        }}
                    />
                    :
                    <Button
                        sx={{
                            ...buttonStyle,
                            bottom: theme.spacing(getIsNewIphonePWA() ? 4.75 : 2.75),
                        }}
                        onClick={() => setOpen(!isOpen)}
                    >
                        {CASHBACK_ADD}
                    </Button>
                }
            </>
        }
    </Stack>;
}

const buttonStyle = {
    position: 'fixed',
    width: theme.spacing(28),
    maxWidth: '100%',
    boxShadow: theme.shadows[9],
    [theme.breakpoints.down('sm')]: {
        height: theme.spacing(6.5),
    }
};
