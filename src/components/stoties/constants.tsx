import { IStory } from './components/story/types.ts';
import { theme } from '../../style/theme.ts';

export const STORIES: IStory[] = [
    {
        id: 1,
        label: 'Как добавлять кэкшбэк',
        imgUrl: './stories/create.png',
        color: theme.palette.purple.main,
        slides: [
            <div>test1</div>,
            <div>test2</div>,
        ],
    },
    {
        id: 2,
        label: 'Какую группировку выбрать',
        imgUrl: './stories/create.png',
        color: theme.palette.green.main,
        slides: [
            <div>test1</div>,
            <div>test2</div>,
        ],
    },
    {
        id: 3,
        label: 'Кэшбэк на следующий месяц',
        imgUrl: './stories/create.png',
        color: theme.palette.yellow.main,
        slides: [
            <div>test1</div>,
            <div>test2</div>,
        ],
    },
    {
        id: 4,
        label: 'Как изменить порядок',
        imgUrl: './stories/create.png',
        color: theme.palette.blue.main,
        slides: [
            <div>test1</div>,
            <div>test2</div>,
        ],
    }
];
