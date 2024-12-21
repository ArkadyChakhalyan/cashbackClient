import { ECashbackPeriod } from '../../../../../../types.ts';

export const CASHBACK_FORM_PERIOD_MONTH_MAP: {[key: number]: string} = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
};

export const CASHBACK_FORM_PERIOD_PERIODS = [
    ECashbackPeriod.CURRENT_MONTH,
    ECashbackPeriod.NEXT_MONTH,
];
