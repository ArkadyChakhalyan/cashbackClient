import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { getUser } from './getUser.ts';
import { ISettings } from 'cashback-check-types';

export const DEFAULT_SETTINGS = {};

export const getSettings: (state: IState) => ISettings = createSelector(
    getUser,
    user => user?.settings || DEFAULT_SETTINGS,
)
