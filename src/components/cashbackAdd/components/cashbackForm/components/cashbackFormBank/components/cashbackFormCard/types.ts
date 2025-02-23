import { EBank, ICard } from 'cashback-check-types';

export type TCashbackFormCardProps = {
    bank: EBank;
    card: ICard;
    setCard: (card: ICard) => void;
};
