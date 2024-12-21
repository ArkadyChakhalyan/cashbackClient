import { ICashback } from 'cashback-check-types/cashback';

export type TCashbackProps = Partial<ICashback> & {
    isDragging: boolean;
    setGroupDragDisabled?: (isDisabled: boolean) => void;
};
