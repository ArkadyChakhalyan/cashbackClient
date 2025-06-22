import { CASHBACKS_CODES } from '../constants.ts';
import { EBank, ICashback } from 'cashback-check-types';
import { IBankCashbackCodeInfo, TBankCashbackCodes, TBankCashbackLoyaltyProgram } from '../types.ts';

const isBankCashbackCodes = (bankCodes: TBankCashbackLoyaltyProgram): boolean => {
    let isBankCashbackCodes = false;
    //@ts-ignore
    for (let bankCode in bankCodes) {
        isBankCashbackCodes = !!bankCodes[bankCode].codes;
        break;
    }
    return isBankCashbackCodes;
}

export const getCashbackCodesInfo = (
    bank: EBank,
    name: string,
): IBankCashbackCodeInfo[] => {
    const codeInfos: IBankCashbackCodeInfo[] = [];
    const bankCodes = CASHBACKS_CODES[bank];
    if (bankCodes && isBankCashbackCodes(bankCodes) && bankCodes[name]) {
        codeInfos.push(bankCodes[name] as IBankCashbackCodeInfo);
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
