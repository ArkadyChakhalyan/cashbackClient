import { EBank } from 'cashback-check-types';

export type TCashbackFormNameProps = {
    bank: EBank;
    name: string;
    setName: (name: string) => void;
};
