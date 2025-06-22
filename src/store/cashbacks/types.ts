import { ECashbackPeriod, IBankCashbackCodeInfo } from '../../types.ts';
import { TCashbackId } from 'cashback-check-types';

export interface ICashbacksState {
    editingCashbackId: TCashbackId;
    isSearchMode: boolean;
    openedActionsCashbackId: TCashbackId;
    openedCashbackCodesInfos: IBankCashbackCodeInfo[];
    period: ECashbackPeriod;
    searchQuery: string;
}
