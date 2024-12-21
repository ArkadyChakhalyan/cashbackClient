import { ECashbackPeriod } from '../../types.ts';
import { TCashbackId } from 'cashback-check-types/cashback';

export interface ICashbacksState {
    editingCashbackId: TCashbackId;
    period: ECashbackPeriod;
}
