export const getIsPWA = (): boolean => {
    //@ts-ignore
    return window.navigator.standalone === true;
}
