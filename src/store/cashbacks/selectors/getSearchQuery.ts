import { IState } from '../../types.ts';

export const getSearchQuery = (
    state: IState
): string => {
    return state.cashbacks.searchQuery;
}
