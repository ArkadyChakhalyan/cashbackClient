import { ECrypto } from './types.ts';
import { BtcIcon } from './icons/btcIcon.tsx';
import { UsdtIcon } from './icons/usdtIcon.tsx';
import { TonIcon } from './icons/tonIcon.tsx';

export const CRYPTO_DONATIONS_DEFAULT = ECrypto.USDT;

export const CRYPTO_DONATIONS_TITLE = 'Поддержать в крипто';
export const CRYPTO_DONATIONS_COPIED = 'Скопировано в буфер обмена';

export const CRYPTO_DONATIONS_OPTIONS = [
    {
        address: 'TB7B4WB3kRU5b9avWRDrtgVZzRKwYZiVhs',
        icon: UsdtIcon,
        label: 'USDT',
        value: ECrypto.USDT,
    },
    {
        address: '1B4d56SZpaVfSBgWDDhCDKoQV4CshAGjAp',
        icon: BtcIcon,
        label: 'BTC',
        value: ECrypto.BTC,
    },
    {
        address: 'UQDLvdV5a2xQV4LqhMkMrK4vARc1mzj44RR08wM1xRzJBG76',
        icon: TonIcon,
        label: 'TON',
        value: ECrypto.TON,
    },
];
