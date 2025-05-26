import { alpha, IconButton, Modal, Paper, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Story } from './components/story/story.tsx';
import { STORIES } from './constants.tsx';
import { getSeenStories } from '../../store/userApi/selectors/getSeenStories.ts';
import { useSelector } from 'react-redux';
import { theme } from '../../style/theme.ts';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IStory } from './components/story/types.ts';
import { useUpdateUserMutation } from '../../store/userApi/userApiSlice.ts';

export const Stories = () => {
    const [updateUser, {
        isLoading,
    }] = useUpdateUserMutation();

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

    const [openedStory, setOpenedStory] = useState<IStory>(null);
    let [currentSlide, _setCurrentSlide] = useState(0);
    const [watchedStoriesIds, setWatchedStoriesIds] = useState([]);
    let [progress, _setProgress] = useState(0);

    const progressRef = useRef(null);
    const storyRef = useRef(null);

    const setProgress = (value: number) => {
        progress = value;
        _setProgress(value);
    };

    const setCurrentSlide = (value: number) => {
        currentSlide = value;
        _setCurrentSlide(value);
    };


    const onClose = () => setOpenedStory(null);

    const timerRef = useRef(null);
    useEffect(() => {
        if (!openedStory) {
            updateUser({ seenStories: [...seenStoriesIds, ...watchedStoriesIds] });
        }
        setProgress(0);
        progressRef.current = 0;
        if (openedStory) {
            setTimeout(() => {
                if (timerRef.current) clearInterval(timerRef.current);
                timerRef.current = setInterval(() => {
                    if (holdRef.current) return;
                    if (progressRef.current >= 100) {
                        setProgress(0);
                        progressRef.current = 0;
                        onNextSlide();
                    } else {
                        const progress = progressRef.current + 0.5;
                        setProgress(progress);
                        progressRef.current = progress;
                    }
                }, 50);
            }, 300);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [openedStory]);

    const onNextSlide = () => {
        if (openedStory.slides.length > currentSlide + 1) {
            setCurrentSlide(currentSlide + 1);
            setProgress(0);
            progressRef.current = 0;
        } else {
            const currentStoryIndex = stories.findIndex(story => story.id === openedStory.id);
            const nextStory = stories[currentStoryIndex + 1];
            if (nextStory && !seenStoriesIds.includes(nextStory.id)) {
                setWatchedStoriesIds([...watchedStoriesIds, nextStory.id]);
                setOpenedStory(nextStory);
                setCurrentSlide(0);
                setProgress(0);
                progressRef.current = 0;
            } else {
                onClose();
            }
        }
    };

    const onStoryClick = (e: React.MouseEvent) => {
        if (holdRef.current) return;

        const rect = storyRef.current.getBoundingClientRect();
        const { clientX } = e;

        if (clientX < rect.left + rect.width / 2) {
            if (progress > 8) {
                setProgress(0);
                progressRef.current = 0;
            } else if (currentSlide) {
                setCurrentSlide(currentSlide - 1);
                setProgress(0);
                progressRef.current = 0;
            }
        } else {
            onNextSlide();
        }
    };

    const holdRef = useRef(null);
    const holdTimerRef = useRef(null);
    const onMouseDown = () => {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        holdTimerRef.current = setTimeout(() => {
            holdRef.current = true;
        }, 300);
    };

    const onMouseUp = () => {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        setTimeout(() => {
            holdRef.current = false;
        }, 0);
    }

    return <Stack
        direction={'row'}
        sx={containerStyle}
    >
        <Modal
            open={!!openedStory}
            onClose={onClose}
            slotProps={{ backdrop: { sx: { backdropFilter: 'blur(3px)' }}}}
        >
            <>
                {openedStory &&
                    <Paper
                        sx={modalStyle}
                        onClick={onStoryClick}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        ref={storyRef}
                    >
                        <Stack sx={headerStyle}>
                            {openedStory.slides.map((slide, index) => (
                                <Stack sx={headerItemStyle} key={index}>
                                    <Stack
                                        sx={{
                                            ...headerItemProgressStyle,
                                            width: index === currentSlide ? `${progress}%` : currentSlide < index ? 0 : '100%',
                                        }}
                                    />
                                </Stack>
                            ))}
                        </Stack>
                        <IconButton
                            sx={closeButtonStyle}
                            onClick={onClose}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                        {openedStory.slides[currentSlide]}
                    </Paper>
                }
            </>
        </Modal>
        {
            stories.map(story => (
                <Story
                    key={story.id}
                    id={story.id}
                    color={story.color}
                    isSeen={story.isSeen}
                    imgUrl={story.imgUrl}
                    label={story.label}
                    slides={story.slides}
                    onClick={() => {
                        setOpenedStory(story);
                        setCurrentSlide(0);
                        if (!seenStoriesIds.includes(story.id)) {
                            setWatchedStoriesIds([...watchedStoriesIds, story.id]);
                        }
                    }}
                />
            ))
        }
    </Stack>;
}

const containerStyle = {
    gap: theme.spacing(),
    overflow: 'auto',
    '::-webkit-scrollbar': {
        display: 'none'
    }
};

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: '100vw',
    minHeight: '100svh',
    maxHeight: theme.spacing(80),
    maxWidth: theme.spacing(60),
    borderRadius: 0,
    [theme.breakpoints.up(64 * 8)]: {
        minHeight: 'unset',
        minWidth: 'unset',
        borderRadius: theme.spacing(1.5),
    }
};

const headerStyle = {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
    flexDirection: 'row',
    gap: theme.spacing(0.75),
};

const headerItemStyle = {
    position: 'relative',
    flexGrow: 1,
    height: theme.spacing(0.5),
    background: alpha(theme.palette.common.white, 0.1),
    borderRadius: theme.spacing(0.5),
    overflow: 'hidden',
};

const headerItemProgressStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: theme.spacing(0.5),
    background: alpha(theme.palette.common.white, 0.7),
}

const closeButtonStyle = {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(3.5),
    bgcolor: theme.palette.background.paper,
};

