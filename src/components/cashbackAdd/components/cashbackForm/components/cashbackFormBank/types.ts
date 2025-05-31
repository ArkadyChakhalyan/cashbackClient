import { EBank, ICard } from 'cashback-check-types';
import { ECashbackPeriod } from '../../../../../../types.ts';

export type TCashbackFormBankProps = {
    bank: EBank;
    card: ICard;
    isOpen: boolean;
    period: ECashbackPeriod;
    setBank: (bank: EBank) => void;
    setCard: (card: ICard) => void;
};
