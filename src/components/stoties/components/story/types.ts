export interface IStory {
    color: string;
    id: TStoryId;
    label: string;
    imgUrl: string;
    slides: JSX.Element[];
}

export type TStoryId = number;

export type TStoryProps = IStory & {
    isSeen: boolean;
    onClick: () => void;
}
