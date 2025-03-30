import { ICashback } from 'cashback-check-types';
import { ICashbackCardGroup } from '../types.ts';

export const getCashbacksGroupedByCard = (
    cashbacks: ICashback[],
): ICashbackCardGroup[] => {
    const sortedCashbacks = [...cashbacks]
        .sort((a, b) => a.cardOrderNumber - b.cardOrderNumber);
    const groupedCashbacks: {[key: string]: ICashbackCardGroup} = {};
    sortedCashbacks.forEach((cashback) => {
        const { card, bank } = cashback;
        const groupName = card ? card.name : cashback.bank;
        const group = groupedCashbacks[groupName];
        if (group) {
            groupedCashbacks[groupName] = {
                ...group,
                cashbacks: [...group.cashbacks, cashback],
            };
        } else {
            groupedCashbacks[groupName] = {
                card,
                bank,
                cashbacks: [cashback],
            };
        }
    });
    return Object.values(groupedCashbacks);
}
