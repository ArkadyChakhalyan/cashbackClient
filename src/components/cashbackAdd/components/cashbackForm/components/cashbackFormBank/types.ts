import { EBank } from 'cashback-check-types/cashback';

export type TCashbackFormBankProps = {
    bank: EBank;
    isOpen: boolean;
    setBank: (bank: EBank) => void;
};

export interface IBank {
    iconURL: string;
    name: string;
    value: EBank;
}
