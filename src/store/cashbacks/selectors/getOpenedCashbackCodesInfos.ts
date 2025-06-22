import { IState } from '../../types.ts';
import { IBankCashbackCodeInfo } from '../../../types.ts';

export const getOpenedCashbackCodesInfos = (
    state: IState
): IBankCashbackCodeInfo[] => {
    return state.cashbacks.openedCashbackCodesInfos;
}
