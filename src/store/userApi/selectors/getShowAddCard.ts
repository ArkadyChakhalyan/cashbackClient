import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { getSettings } from './getSettings.ts';

export const getShowAddCard: (state: IState) => boolean = createSelector(
    getSettings,
    settings => !settings.isShowAddCard,
)
