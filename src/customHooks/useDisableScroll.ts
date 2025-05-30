import { useEffect } from 'react';

export const useDisableScroll = (isEnabled: boolean) => {
    const freezeVp = function(e: TouchEvent) {
        e.preventDefault();
    };

    function stopBodyScrolling (isEnabled: boolean) {
        if (isEnabled) {
            document.body.addEventListener('touchmove', freezeVp, { passive: false });
        } else {
            document.body.removeEventListener('touchmove', freezeVp, false);
        }
    }

    useEffect(() => {
        document.documentElement.style.overflow = isEnabled ? 'hidden' : '';
        stopBodyScrolling(isEnabled)
    }, [isEnabled]);
};
