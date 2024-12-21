import { EBank, ICashback } from 'cashback-check-types/cashback';

export type TCashbacksProps = {
    setError: (isError: boolean) => void;
}

export interface ICashbackGroup {
    bank: EBank;
    cashbacks: ICashback[];
}
