import { EBank, ICashback } from 'cashback-check-types';

export type TCashbacksProps = {
    setError: (isError: boolean) => void;
}

export interface ICashbackGroup {
    bank: EBank;
    cashbacks: ICashback[];
}
