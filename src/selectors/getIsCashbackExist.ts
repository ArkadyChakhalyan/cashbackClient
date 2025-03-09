import { ICashback } from 'cashback-check-types';
import { getSameCashback } from './getSameCashback.ts';

export const getIsCashbackExist = (
    cashbacks: ICashback[],
    cashback: Partial<ICashback>,
): boolean => {
    return !!getSameCashback(cashbacks, cashback);
};
