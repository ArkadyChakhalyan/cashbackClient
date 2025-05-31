import { TCashbackId } from 'cashback-check-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICashbacksState } from './types.ts';
import { ECashbackPeriod, IBankCashbackCodeInfo } from '../../types.ts';

const initialState: ICashbacksState = {
    editingCashbackId: null,
    isSearchMode: false,
    openedActionsCashbackId: null,
    openedCashbackCodesInfo: null,
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
        setOpenedActionsCashbackIdAC: (state, action: PayloadAction<TCashbackId>) => {
            return {
                ...state,
                openedActionsCashbackId: action.payload,
            };
        },
        setOpenedCashbackCodesInfoAC: (state, action: PayloadAction<IBankCashbackCodeInfo>) => {
            return {
                ...state,
                openedCashbackCodesInfo: action.payload,
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
    setOpenedActionsCashbackIdAC,
    setOpenedCashbackCodesInfoAC,
    setPeriodAC,
    setSearchQueryAC,
} = cashbacksSlice.actions;

export default cashbacksSlice.reducer;
