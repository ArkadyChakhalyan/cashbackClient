import { IBank } from '../../../../../../../types.ts';
import { BANKS } from '../../../../../../../constants.ts';
import { EBank, ICard, ICashback } from 'cashback-check-types';

export const getSortedBanks = (
    userBanks: EBank[],
    userCards: ICard[],
    cashbacks: ICashback[],
): IBank[] => {
    const userBanksToShow = BANKS.filter(bank => userBanks.includes(bank.value));
    const userBanksToShowValues = userBanksToShow.map(bank => bank.value);
    const cardBanks = [...new Set(userCards.map(card => card.bank))];
    const cardBanksToShow = BANKS.filter(bank => cardBanks.includes(bank.value) && !userBanksToShowValues.includes(bank.value));
    const cardBanksToShowValues = cardBanksToShow.map(bank => bank.value);
    return [
        ...userBanksToShow,
        ...cardBanksToShow,
        ...BANKS.filter(bank => !userBanksToShowValues.includes(bank.value) && !cardBanksToShowValues.includes(bank.value)),
    ].map(bank => {
        return {
            ...bank,
            cashbackCount: cashbacks.filter(cashback => cashback.bank === bank.value).length,
        }
    });
}
