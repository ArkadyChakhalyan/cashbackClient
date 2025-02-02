import { TCashbackId } from 'cashback-check-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICashbacksState } from './types.ts';
import { ECashbackPeriod } from '../../types.ts';

const initialState: ICashbacksState = {
    editingCashbackId: null,
    isSearchMode: false,
    period: ECashbackPeriod.CURRENT_MONTH,
    searchQuery: '',
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
        setSearchQueryAC: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                searchQuery: action.payload,
            };
        },
        setIsSearchModeAC: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isSearchMode: action.payload,
            };
        },
    },
});

export const {
    setEditingCashbackIdAC,
    setIsSearchModeAC,
    setPeriodAC,
    setSearchQueryAC,
} = cashbacksSlice.actions;

export default cashbacksSlice.reducer;
