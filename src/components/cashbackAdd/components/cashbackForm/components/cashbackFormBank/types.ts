import { EBank } from 'cashback-check-types';

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
