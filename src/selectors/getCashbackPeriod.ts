import { ECashbackPeriod } from '../types.ts';

export const getCashbackPeriod = (
    date: number
): ECashbackPeriod => {
    const currentMonth = new Date().getMonth();
    const dateMonth = new Date(date).getMonth();
    if (currentMonth === dateMonth) {
        return ECashbackPeriod.CURRENT_MONTH;
    } else {
        return ECashbackPeriod.NEXT_MONTH;
    }
}
