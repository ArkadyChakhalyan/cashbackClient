import { EBank } from 'cashback-check-types';
import { ICard } from './components/cashbackFormCard/types.ts';

export type TCashbackFormBankProps = {
    bank: EBank;
    card: ICard;
    isOpen: boolean;
    setBank: (bank: EBank) => void;
    setCard: (card: ICard) => void;
};

export interface IBank {
    iconURL: string;
    name: string;
    value: EBank;
}
