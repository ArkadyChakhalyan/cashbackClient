import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { selectCashbacksResult } from './getCashbacks.ts';

export const getIsLoading: (state: IState) => boolean = createSelector(
    selectCashbacksResult,
    cashbacksResult => !cashbacksResult?.data,
)
