import { ICashback } from 'cashback-check-types';

export const getSameCashback = (
    cashbacks: ICashback[],
    cashback: Partial<ICashback>,
): ICashback => {
    return cashbacks.find(item => {
        return cashback.name === item.name &&
            cashback.percentage === item.percentage &&
            cashback.bank === item.bank &&
            cashback.card?.name === item.card?.name &&
            !!cashback.limitless === !!item.limitless
    });
};
