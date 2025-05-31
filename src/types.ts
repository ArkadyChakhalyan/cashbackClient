import { EBank } from 'cashback-check-types';

export interface IBank {
    iconUrl: string;
    name: string;
    value: EBank;
    cashbackCount?: number;
}

export enum ECashbackPeriod {
    CURRENT_MONTH = 0,
    NEXT_MONTH = 1,
}

export enum ESnackbarVariant {
    ERROR = 'error',
    SUCCESS = 'success',
}

export type TCashbackCode = string;

export interface IBankCashbackCodeInfo {
    codes: TCashbackCode[];
    isExclude?: boolean;
}

export type TBankCashbackCodes = {[key: string]: IBankCashbackCodeInfo};
