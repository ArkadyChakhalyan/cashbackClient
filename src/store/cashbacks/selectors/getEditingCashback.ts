import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ICashback, TCashbackId } from 'cashback-check-types/cashback';
import { getCashbacks } from '../../cashbackApi/selectors/getCashbacks.ts';
import { getEditingCashbackId } from './getEditingCashbackId.ts';

export const getEditingCashback: (state: IState) => ICashback = createSelector(
    getEditingCashbackId,
    getCashbacks,
    (cashbackId: TCashbackId, cashbacks: ICashback[]) => {
        return cashbacks && cashbacks.find(cashback => cashback.id === cashbackId);
    }
)
