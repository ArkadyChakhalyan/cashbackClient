import { ICashback } from 'cashback-check-types';
import { ICashbackBankGroup } from '../types.ts';

export const getCashbacksGroupedByBank = (
    cashbacks: ICashback[],
): ICashbackBankGroup[] => {
    const sortedCashbacks = [...cashbacks]
        .sort((a, b) => a.bankOrderNumber - b.bankOrderNumber);
    const groupedCashbacks: {[key: string]: ICashbackBankGroup} = {};
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
