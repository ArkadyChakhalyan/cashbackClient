import { ICashback } from 'cashback-check-types/cashback';

export const getOrderNumber = (
    cashbacks: ICashback[],
): number => {
    return cashbacks.length;
};
