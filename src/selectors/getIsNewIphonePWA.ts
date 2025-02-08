import { getIsPWA } from './getIsPWA.ts';
import { getIsIphoneXorNewer } from './getIsIphoneXorNewer.ts';

export const getIsNewIphonePWA = (): boolean => {
    return getIsIphoneXorNewer() && getIsPWA();
}
