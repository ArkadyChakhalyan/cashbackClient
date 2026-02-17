import { ECrypto } from './types.ts';
import { BtcIcon } from './icons/btcIcon.tsx';
import { UsdtIcon } from './icons/usdtIcon.tsx';
import { TonIcon } from './icons/tonIcon.tsx';

export const CRYPTO_DONATIONS_DEFAULT = ECrypto.USDT;

export const CRYPTO_DONATIONS_TITLE = 'Поддержать в крипте';
export const CRYPTO_DONATIONS_COPIED = 'Скопировано в буфер обмена';

export const CRYPTO_DONATIONS_OPTIONS = [
    {
        address: 'TFcpNDntz2s6NrH2NvPXHZS43Q65wP8CzJ',
        icon: UsdtIcon,
        label: 'USDT',
        value: ECrypto.USDT,
    },
    {
        address: '15YcjJKxGyUqQ93uJnLgnMBTtVnCG9iK4C',
        icon: BtcIcon,
        label: 'BTC',
        value: ECrypto.BTC,
    },
    {
        address: 'UQB6DG8CSUaSh7pskvGp2AVzIsnzN9MdUHcnQigUgB3-kRpL',
        icon: TonIcon,
        label: 'TON',
        value: ECrypto.TON,
    },
];
