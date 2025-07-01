import { useEffect } from 'react';
import { SCROLL_CLASS } from './constants.tsx';

function freezeVp (e: TouchEvent) {
    let isScrollable = e.target === document.documentElement;
    if (!isScrollable) {
        let el = e.target as HTMLElement;
        while (el && el !== document.body) {
            if (el.classList.contains(SCROLL_CLASS)) {
                isScrollable = true;
                break;
            }
            el = el.parentElement;
        }
    }

    if (!isScrollable) {
        e.preventDefault();
    }
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
