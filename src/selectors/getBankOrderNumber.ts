import { EBank, ICashback } from 'cashback-check-types/cashback';

export const getBankOrderNumber = (
    cashbacks: ICashback[],
    bank: EBank,
): number => {
    const sortedCashbacks = [...cashbacks]
        .sort((a, b) => a.bankOrderNumber - b.bankOrderNumber);
    let bankOrderNumber;
    if (cashbacks.find(cashback => cashback.bank === bank)) {
        let beforeIndex;
        let afterIndex;
        for (let i = 0; i < sortedCashbacks.length; i++) {
            const cashback = cashbacks[i];
            const isSameBank = cashback.bank === bank;
            if (!isSameBank || !beforeIndex) {
                continue;
            }
            if (isSameBank) {
                beforeIndex = i;
            }
            if (beforeIndex && !isSameBank && !afterIndex) {
                afterIndex = i;
            }
        }
        if (beforeIndex >= afterIndex) {
            afterIndex = beforeIndex + 1;
        }
        const beforeBankOrderNumber = sortedCashbacks[beforeIndex]?.bankOrderNumber || 0;
        const afterBankOrderNumber = sortedCashbacks[afterIndex]?.bankOrderNumber || beforeBankOrderNumber + 1;
        bankOrderNumber = (beforeBankOrderNumber + afterBankOrderNumber) / 2;
    } else {
        bankOrderNumber = sortedCashbacks.length ? sortedCashbacks.at(-1).bankOrderNumber + 1 : 0;
    }
    return bankOrderNumber;
};
