import { ICashback } from 'cashback-check-types';

export const getOrderNumber = (
    cashbacks: ICashback[],
): number => {
    return cashbacks.length;
};
