import { IBank } from './types.ts';
import { EBank } from 'cashback-check-types';

export const APP_NAME = 'CashbackCheck';

export const BASE_API_URL = import.meta.env.VITE_API_URL;

export const BANKS: IBank[] = [
    {
        iconUrl: './banks/t.png',
        name: 'Т-Банк',
        value: EBank.T,
    },
    {
        iconUrl: './banks/sber.png',
        name: 'СберБанк',
        value: EBank.SBER,
    },
    {
        iconUrl: './banks/vtb.png',
        name: 'ВТБ',
        value: EBank.VTB,
    },
    {
        iconUrl: './banks/alpha.png',
        name: 'Альфа-Банк',
        value: EBank.ALPHA,
    },
    {
        iconUrl: './banks/yandex.png',
        name: 'Яндекс Пэй',
        value: EBank.YANDEX_PAY,
    },
    {
        iconUrl: './banks/gazprom.png',
        name: 'Газпромбанк',
        value: EBank.GAZPROM,
    },
    {
        iconUrl: './banks/otp.png',
        name: 'ОТП Банк',
        value: EBank.OTP,
    },
    {
        iconUrl: './banks/psb.png',
        name: 'ПСБ',
        value: EBank.PSB,
    },
    {
        iconUrl: './banks/ozon.png',
        name: 'Озон Банк',
        value: EBank.OZON,
    },
    {
        iconUrl: './banks/sovcom.png',
        name: 'Совкомбанк',
        value: EBank.SOVCOM,
    },
    {
        iconUrl: './banks/mts.png',
        name: 'МТС Банк',
        value: EBank.MTS,
    },
    {
        iconUrl: './banks/uralsib.png',
        name: 'Уралсиб Банк',
        value: EBank.URAL,
    },
    {
        iconUrl: './banks/raiffeisen.png',
        name: 'Райфайзен Банк',
        value: EBank.RAIFFEISEN,
    },
    {
        iconUrl: './banks/akbars.png',
        name: 'Ак Барс',
        value: EBank.AKBARS,
    },
    {
        iconUrl: './banks/mkb.png',
        name: 'МКБ',
        value: EBank.MKB,
    },
    {
        iconUrl: './banks/pochta.png',
        name: 'Почта Банк',
        value: EBank.POCHTA,
    },
    {
        iconUrl: './banks/rosselhoz.png',
        name: 'Россельхозбанк',
        value: EBank.ROSSELHOZ,
    },
    {
        iconUrl: './banks/svoi.png',
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
