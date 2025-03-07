import { ICashback } from 'cashback-check-types';

export const getIsCashbackExist = (
    cashbacks: ICashback[],
    cashback: Partial<ICashback>,
): boolean => {
    return !!cashbacks.find(item => {
        return cashback.name === item.name &&
            cashback.percentage === item.percentage &&
            cashback.bank === item.bank &&
            cashback.card?.name === item.card?.name;
    });
};
