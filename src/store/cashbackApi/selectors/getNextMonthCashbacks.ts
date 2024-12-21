import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ICashback } from 'cashback-check-types/cashback';
import { ECashbackPeriod } from '../../../types.ts';
import { getCashbackPeriod } from '../../../selectors/getCashbackPeriod.ts';
import { getCashbacks } from './getCashbacks.ts';

export const getNextMonthCashbacks: (state: IState) => ICashback[] = createSelector(
    getCashbacks,
    (cashbacks) => {
        return cashbacks.filter(item => getCashbackPeriod(item.timestamp) === ECashbackPeriod.NEXT_MONTH);
    }
)
