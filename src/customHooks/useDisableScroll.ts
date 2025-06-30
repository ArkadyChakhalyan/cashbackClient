import { useEffect } from 'react';

function freezeVp (e: TouchEvent) {
    e.preventDefault();
}

export const useDisableScroll = (isEnabled: boolean) => {

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
