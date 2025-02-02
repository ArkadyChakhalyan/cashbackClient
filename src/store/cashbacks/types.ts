import { ECashbackPeriod } from '../../types.ts';
import { TCashbackId } from 'cashback-check-types';

export interface ICashbacksState {
    editingCashbackId: TCashbackId;
    period: ECashbackPeriod;
}
