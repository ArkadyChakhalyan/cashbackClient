import { EBank, ICard, ICashback } from 'cashback-check-types';

export type TCashbackCardViewProps = {
    cashbacks: ICashback[];
}

export interface ICashbackCardGroup {
    bank: EBank;
    card: ICard;
    cashbacks: ICashback[];
}
