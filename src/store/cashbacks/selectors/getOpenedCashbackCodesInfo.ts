import { IState } from '../../types.ts';
import { IBankCashbackCodeInfo } from '../../../types.ts';

export const getOpenedCashbackCodesInfo = (
    state: IState
): IBankCashbackCodeInfo => {
    return state.cashbacks.openedCashbackCodesInfo;
}
