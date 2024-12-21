import { IBank } from './types.ts';
import { EBank } from 'cashback-check-types/cashback';

export const BASE_API_URL = import.meta.env.VITE_API_URL;

export const BANKS: IBank[] = [
    {
        iconUrl: './t.png',
        name: 'Т-Банк',
        value: EBank.T,
    },
    {
        iconUrl: './sber.png',
        name: 'СберБанк',
        value: EBank.SBER,
    },
    {
        iconUrl: './vtb.png',
        name: 'ВТБ',
        value: EBank.VTB,
    },
    {
        iconUrl: './alpha.png',
        name: 'Альфа-Банк',
        value: EBank.ALPHA,
    },
    {
        iconUrl: './gazprom.png',
        name: 'Газпромбанк',
        value: EBank.GAZPROM,
    },
    {
        iconUrl: './ozon.png',
        name: 'Ozon Банк',
        value: EBank.OZON,
    },
    {
        iconUrl: './sovcom.png',
        name: 'Совкомбанк',
        value: EBank.SOVCOM,
    },
    {
        iconUrl: './mts.png',
        name: 'МТС Банк',
        value: EBank.MTS,
    },
    {
        iconUrl: './ural.png',
        name: 'Уралсиб Банк',
        value: EBank.URAL,
    },
    {
        iconUrl: './raiffeisen.png',
        name: 'Райфайзен Банк',
        value: EBank.RAIFFEISEN,
    },
    {
        iconUrl: './otp.png',
        name: 'ОТП Банк',
        value: EBank.OTP,
    },
    {
        iconUrl: './svoi.png',
        name: 'Свой Банк',
        value: EBank.SVOI,
    },
];

export const SHOW_NEXT_MONTH_DAY = 25;

export const ERROR_BASE = 'Произошла ошибка. Попробуйте снова.';

export const MONTH_MAP: {[key: number]: string} = {
    0: 'январе',
    1: 'феврале',
    2: 'марте',
    3: 'апреле',
    4: 'мае',
    5: 'июне',
    6: 'июле',
    7: 'августе',
    8: 'сентябре',
    9: 'октябре',
    10: 'ноябре',
    11: 'декабре',
};
