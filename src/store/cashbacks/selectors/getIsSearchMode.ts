import { IState } from '../../types.ts';

export const getIsSearchMode = (
    state: IState
): boolean => {
    return state.cashbacks.isSearchMode;
}
