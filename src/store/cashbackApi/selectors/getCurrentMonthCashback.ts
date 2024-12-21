import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ICashback, TCashbackId } from 'cashback-check-types/cashback';
import { getCurrentMonthCashbacks } from './getCurrentMonthCashbacks.ts';

export const getCurrentMonthCashback: (state: IState, cashbackId: TCashbackId) => ICashback = createSelector(
    getCurrentMonthCashbacks,
    (state: IState, cashbackId: TCashbackId) => cashbackId,
    (cashbacks: ICashback[], cashbackId: TCashbackId) => {
        return cashbacks && cashbacks.find(cashback => cashback.id === cashbackId);
    }
)
