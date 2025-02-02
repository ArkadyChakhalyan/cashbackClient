import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { ECashbacksView } from 'cashback-check-types';
import { getUser } from './getUser.ts';

export const getCashbacksView: (state: IState) => ECashbacksView = createSelector(
    getUser,
    user => user?.cashbacksView || ECashbacksView.DEFAULT
)
