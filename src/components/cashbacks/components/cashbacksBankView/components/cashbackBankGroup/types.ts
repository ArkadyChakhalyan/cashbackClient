import { EBank, ICashback } from 'cashback-check-types';

export type TCashbackBankGroupProps = {
    bank: EBank;
    cashbacks: ICashback[];
    isDragging: boolean;
    setGroupDragDisabled: (isDisabled: boolean) => void;
}
