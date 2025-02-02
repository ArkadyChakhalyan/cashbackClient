import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ICashback, TCashbackId } from 'cashback-check-types';
import { getNextMonthCashbacks } from './getNextMonthCashbacks.ts';

export const getNextMonthCashback: (state: IState, cashbackId: TCashbackId) => ICashback = createSelector(
    getNextMonthCashbacks,
    (state: IState, cashbackId: TCashbackId) => cashbackId,
    (cashbacks: ICashback[], cashbackId: TCashbackId) => {
        return cashbacks && cashbacks.find(cashback => cashback.id === cashbackId);
    }
)
