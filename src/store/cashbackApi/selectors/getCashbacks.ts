import { cashbackApiSlice } from '../cashbackApiSlice.ts';
import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ICashback } from 'cashback-check-types';

export const selectCashbacksResult = cashbackApiSlice.endpoints.getCashbacks.select(null);

const DEFAULT_CASHBACKS: ICashback[] = [];

export const getCashbacks: (state: IState) => ICashback[] = createSelector(
    selectCashbacksResult,
    cashbacksResult => cashbacksResult?.data || DEFAULT_CASHBACKS,
)
