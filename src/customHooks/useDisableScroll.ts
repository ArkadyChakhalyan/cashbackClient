import { useEffect } from 'react';

export const useDisableScroll = (isEnabled: boolean) => {
    useEffect(() => {
        document.documentElement.style.overflow = isEnabled ? 'hidden' : '';
        document.documentElement.style.width = isEnabled ? '100%' : '';
        document.documentElement.style.height = isEnabled ? '100%' : '';
        document.documentElement.style.position = isEnabled ? 'fixed' : '';
    }, [isEnabled]);
};
