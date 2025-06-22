import { CASHBACKS_CODES } from '../constants.ts';
import { EBank, ICashback } from 'cashback-check-types';
import { IBankCashbackCodeInfo, TBankCashbackCodes, TBankCashbackLoyaltyProgram } from '../types.ts';

const isBankCashbackCodes = (item: TBankCashbackLoyaltyProgram): item is TBankCashbackCodes => {
    if (item === null || item === undefined) {
        return false;
    }
    return !Array.isArray(item) && Object.keys(item).every(key => {
        const value = item[key];
        return value && typeof value === 'object' && 'codes' in value && Array.isArray(value.codes);
    });
}

export const getCashbackCodesInfo = (
    bank: EBank,
    name: string,
): IBankCashbackCodeInfo[] => {
    const codeInfos: IBankCashbackCodeInfo[] = [];
    const bankCodes = CASHBACKS_CODES[bank];
    if (isBankCashbackCodes(bankCodes) && bankCodes && bankCodes[name]) {
        codeInfos.push(bankCodes[name]);
    } else {
        for (let loyaltyProgram in bankCodes as {[key: string]: TBankCashbackCodes}) {
            const loyaltyCodes  = bankCodes[loyaltyProgram] as TBankCashbackCodes;
            if (loyaltyCodes[name]) {
                codeInfos.push({
                    ...loyaltyCodes[name],
                    loyaltyProgram,
                });
            }
        }
    }
    return codeInfos;
}
