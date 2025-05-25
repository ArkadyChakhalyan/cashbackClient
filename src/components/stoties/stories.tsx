import { Stack } from '@mui/material';
import React from 'react';
import { Story } from './components/story/story.tsx';
import { STORIES } from './constants.ts';
import { getSeenStories } from '../../store/userApi/selectors/getSeenStories.ts';
import { useSelector } from 'react-redux';
import { theme } from '../../style/theme.ts';

export const Stories = () => {
    const seenStoriesIds = useSelector(getSeenStories);
    const seenStories = [];
    const unseenStories = [];
    for (let i = 0; i < STORIES.length; i++) {
        const story = STORIES[i];
        if (seenStoriesIds.includes(story.id)) {
            seenStories.push({
                ...story,
                isSeen: true,
            });
        } else {
            unseenStories.push({
                ...story,
                isSeen: false,
            });
        }
    }
    const stories = [
        ...unseenStories,
        ...seenStories,
    ];

    return <Stack
        direction={'row'}
        sx={containerStyle}
    >
        {
            stories.map(story => (
                <Story
                    key={story.id}
                    id={story.id}
                    color={story.color}
                    isSeen={story.isSeen}
                    imgUrl={story.imgUrl}
                    label={story.label}
                />
            ))
        }
    </Stack>;
}

const containerStyle = {
    gap: theme.spacing(0.75),
    overflow: 'auto',
    '::-webkit-scrollbar': {
        display: 'none'
    }
};
