import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { getUser } from './getUser.ts';
import { TStoryId } from '../../../components/stoties/components/story/types.ts';

const DEFAULT_SEEN_STORIES: TStoryId[] = [];

export const getSeenStories: (state: IState) => TStoryId[] = createSelector(
    getUser,
    user => user?.seenStories || DEFAULT_SEEN_STORIES,
)
