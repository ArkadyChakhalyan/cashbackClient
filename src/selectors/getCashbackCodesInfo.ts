import { CASHBACKS_CODES } from '../constants.ts';
import { ICashback } from 'cashback-check-types';
import { IBankCashbackCodeInfo } from '../types.ts';

export const getCashbackCodesInfo = (
    cashback: ICashback,
): IBankCashbackCodeInfo => {
    const bankCodes = CASHBACKS_CODES[cashback.bank];
    return bankCodes && bankCodes[cashback.name];
}
