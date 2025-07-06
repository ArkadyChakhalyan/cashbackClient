import { FC } from 'react';
import { TSlideProps } from '../slides/types.ts';

export interface IStory {
    color: string;
    id: TStoryId;
    label: string;
    imgUrl: string;
    slides: FC<TSlideProps>[];
}

export type TStoryId = number;

export type TStoryProps = IStory & {
    isSeen: boolean;
    onClick: () => void;
}
