export interface IStory {
    color: string;
    id: TStoryId;
    label: string;
    imgUrl: string;
}

export type TStoryId = number;

export type TStoryProps = IStory & {
    isSeen: boolean;
}
