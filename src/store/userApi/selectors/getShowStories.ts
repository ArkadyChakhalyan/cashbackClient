import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { getSettings } from './getSettings.ts';

export const getShowStories: (state: IState) => boolean = createSelector(
    getSettings,
    settings => !settings.isHideStories,
)
