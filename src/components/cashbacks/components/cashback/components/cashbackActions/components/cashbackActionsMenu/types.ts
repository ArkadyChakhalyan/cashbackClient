import { TCashbackId } from 'cashback-check-types';

export type TCashbackActionsMenuProps = {
    anchor: Element;
    id: TCashbackId,
    onClose: () => void;
};
