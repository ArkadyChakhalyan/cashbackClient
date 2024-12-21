import { IState } from '../../types.ts';
import { TCashbackId } from 'cashback-check-types/cashback';

export const getEditingCashbackId = (
    state: IState
): TCashbackId => {
    return state.cashbacks.editingCashbackId;
}
