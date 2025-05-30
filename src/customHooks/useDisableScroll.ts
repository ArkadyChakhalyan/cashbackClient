import { useEffect } from 'react';

export const useDisableScroll = (isEnabled: boolean) => {
    useEffect(() => {
        document.documentElement.style.overflow = isEnabled ? 'hidden' : '';
    }, [isEnabled]);
};
