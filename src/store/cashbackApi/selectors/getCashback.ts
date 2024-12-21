import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ICashback, TCashbackId } from 'cashback-check-types/cashback';
import { getCashbacks } from './getCashbacks.ts';

export const getCashback: (state: IState, cashbackId: TCashbackId) => ICashback = createSelector(
    getCashbacks,
    (state: IState, cashbackId: TCashbackId) => cashbackId,
    (cashbacks: ICashback[], cashbackId: TCashbackId) => {
        return cashbacks && cashbacks.find(cashback => cashback.id === cashbackId);
    }
)
