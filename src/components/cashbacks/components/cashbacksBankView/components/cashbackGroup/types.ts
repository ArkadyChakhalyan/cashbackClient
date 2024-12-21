import { EBank, ICashback } from 'cashback-check-types/cashback';

export type TCashbackGroupProps = {
    bank: EBank;
    cashbacks: ICashback[];
    isDragging: boolean;
    setGroupDragDisabled: (isDisabled: boolean) => void;
}

export interface ICashbackGroupBank {
    name: string;
}

export interface ICashbackGroupBanks {[key: string]: ICashbackGroupBank}
