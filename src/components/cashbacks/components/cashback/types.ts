import { ICashback } from 'cashback-check-types';

export type TCashbackProps = Partial<ICashback> & {
    isDragging: boolean;
    setGroupDragDisabled?: (isDisabled: boolean) => void;
};
