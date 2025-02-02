import { TCashbackId } from 'cashback-check-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICashbacksState } from './types.ts';
import { ECashbackPeriod } from '../../types.ts';

const initialState: ICashbacksState = {
    editingCashbackId: null,
    period: ECashbackPeriod.CURRENT_MONTH,
};

export const cashbacksSlice = createSlice({
    name: 'cashbacks',
    initialState,
    reducers: {
        setEditingCashbackIdAC: (state, action: PayloadAction<TCashbackId>) => {
            return {
                ...state,
                editingCashbackId: action.payload,
            };
        },
        setPeriodAC: (state, action: PayloadAction<ECashbackPeriod>) => {
            return {
                ...state,
                period: action.payload,
            };
        },
    },
});

export const {
    setEditingCashbackIdAC,
    setPeriodAC
} = cashbacksSlice.actions;

export default cashbacksSlice.reducer;
