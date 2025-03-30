import { EBank, ICard, ICashback } from 'cashback-check-types';

export type TCashbackCardGroupProps = {
    bank: EBank;
    card: ICard;
    cashbacks: ICashback[];
    isDragging: boolean;
    setGroupDragDisabled: (isDisabled: boolean) => void;
}
