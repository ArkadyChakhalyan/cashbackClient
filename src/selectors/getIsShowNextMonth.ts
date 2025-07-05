import { SHOW_NEXT_MONTH_DAY } from '../constants.ts';

export const getIsShowNextMonth = (): boolean => {
    const date = new Date();
    return date.getDate() >= SHOW_NEXT_MONTH_DAY;
};
