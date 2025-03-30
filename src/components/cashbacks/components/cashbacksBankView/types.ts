import { EBank, ICashback } from 'cashback-check-types';

export type TCashbackBankViewProps = {
    cashbacks: ICashback[];
}

export interface ICashbackBankGroup {
    bank: EBank;
    cashbacks: ICashback[];
}

