import { cardApiSlice } from '../cardApiSlice.ts';
import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ICard } from 'cashback-check-types';

export const selectCardsResult = cardApiSlice.endpoints.getCards.select(null);

export const getCards: (state: IState) => ICard[] = createSelector(
    selectCardsResult,
    cardsResult => cardsResult?.data || []
)
