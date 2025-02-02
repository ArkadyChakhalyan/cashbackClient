import { ICashbackGroup } from '../../../types.ts';
import { ICashback } from 'cashback-check-types';

export const getCashbacksGroupedByBank = (
    cashbacks: ICashback[],
): ICashbackGroup[] => {
    const sortedCashbacks = [...cashbacks]
        .sort((a, b) => a.bankOrderNumber - b.bankOrderNumber);
    const groupedCashbacks: {[key: string]: ICashbackGroup} = {};
    sortedCashbacks.forEach((cashback) => {
        const bank = cashback.bank;
        const group = groupedCashbacks[bank];
        if (group) {
            groupedCashbacks[bank] = {
                ...group,
                cashbacks: [...group.cashbacks, cashback],
            };
        } else {
            groupedCashbacks[bank] = {
                bank,
                cashbacks: [cashback],
            };
        }
    });
    return Object.values(groupedCashbacks);
}
