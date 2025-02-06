export const getIsIOS = (): boolean => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
