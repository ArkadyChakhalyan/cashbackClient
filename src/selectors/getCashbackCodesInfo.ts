import { CASHBACKS_CODES } from '../constants.ts';
import { EBank } from 'cashback-check-types';
import { IBankCashbackCodeInfo, TBankCashbackCodes } from '../types.ts';

export const getCashbackCodesInfo = (
    bank: EBank,
    name: string,
): IBankCashbackCodeInfo[] => {
    const codeInfos: IBankCashbackCodeInfo[] = [];
    const bankCodes = CASHBACKS_CODES[bank];
    if (bankCodes && bankCodes.codes && bankCodes[name]) {
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
