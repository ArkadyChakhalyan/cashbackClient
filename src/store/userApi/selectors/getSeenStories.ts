import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { getUser } from './getUser.ts';
import { TStoryId } from '../../../components/stoties/components/story/types.ts';

export const getSeenStories: (state: IState) => TStoryId[] = createSelector(
    getUser,
    user => user?.seenStories || []
)
