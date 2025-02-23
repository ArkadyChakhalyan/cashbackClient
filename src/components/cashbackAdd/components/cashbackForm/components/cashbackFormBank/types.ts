import { EBank, ICard } from 'cashback-check-types';

export type TCashbackFormBankProps = {
    bank: EBank;
    card: ICard;
    isOpen: boolean;
    setBank: (bank: EBank) => void;
    setCard: (card: ICard) => void;
};
