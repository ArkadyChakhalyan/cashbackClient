import React, { ReactNode } from 'react';

export type TModalProps = {
    body: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
}
