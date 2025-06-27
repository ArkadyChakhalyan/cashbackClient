import { ECrypto } from './types.ts';
import { BtcIcon } from './icons/btcIcon.tsx';
import { UsdtIcon } from './icons/usdtIcon.tsx';
import { TonIcon } from './icons/tonIcon.tsx';

export const CRYPTO_DONATIONS_DEFAULT = ECrypto.USDT;

export const CRYPTO_DONATIONS_TITLE = 'Поддержать в крипте';
export const CRYPTO_DONATIONS_COPIED = 'Скопировано в буфер обмена';

export const CRYPTO_DONATIONS_OPTIONS = [
    {
        address: '0xeb6d88f1a8ac080536b79a0b0b4b8eadf9351b40',
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
