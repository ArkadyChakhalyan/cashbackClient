import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { EBank } from 'cashback-check-types/cashback';
import { getCashbacks } from './getCashbacks.ts';

export const getUserBanks: (state: IState) => EBank[] = createSelector(
    getCashbacks,
    (cashbacks) => {
       return cashbacks.reduce((banks, cashback) => {
           if (!banks.includes(cashback.bank)) {
               banks.push(cashback.bank);
           }
           return banks;
       }, []);
    }
)
