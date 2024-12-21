import { IState } from '../../types.ts';
import { ECashbackPeriod } from '../../../types.ts';

export const getPeriod = (
    state: IState
): ECashbackPeriod => {
    return state.cashbacks.period;
}
