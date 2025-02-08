export const getIsIphoneXorNewer = (): boolean => {
    return /iPhone/.test(navigator.userAgent) && window.innerHeight / window.innerWidth > 2;
}
