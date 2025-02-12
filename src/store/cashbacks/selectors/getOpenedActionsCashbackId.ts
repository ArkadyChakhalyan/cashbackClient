import { IState } from '../../types.ts';
import { TCashbackId } from 'cashback-check-types';

export const getOpenedActionsCashbackId = (
    state: IState
): TCashbackId => {
    return state.cashbacks.openedActionsCashbackId;
}
