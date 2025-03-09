import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ICashback } from 'cashback-check-types';
import { ECashbackPeriod } from '../../../types.ts';
import { getCashbackPeriod } from '../../../selectors/getCashbackPeriod.ts';
import { getCashbacks } from './getCashbacks.ts';

export const getCurrentMonthCashbacks: (state: IState) => ICashback[] = createSelector(
    getCashbacks,
    (cashbacks) => {
        console.log(cashbacks)
        return cashbacks.filter(item => getCashbackPeriod(item.timestamp) === ECashbackPeriod.CURRENT_MONTH);
    }
)
