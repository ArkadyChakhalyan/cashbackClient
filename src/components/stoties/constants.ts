import { IStory } from './components/story/types.ts';
import { theme } from '../../style/theme.ts';

export const STORIES: IStory[] = [
    {
        id: 0,
        label: 'Как добавлять кэкшбэк',
        imgUrl: './stories/create.png',
        color: theme.palette.purple.main,
    },
    {
        id: 1,
        label: 'Какую группировку выбрать',
        imgUrl: './stories/create.png',
        color: theme.palette.green.main,
    },
    {
        id: 2,
        label: 'Кэшбэк на следующий месяц',
        imgUrl: './stories/create.png',
        color: theme.palette.yellow.main,
    },
    {
        id: 3,
        label: 'Как изменить порядок',
        imgUrl: './stories/create.png',
        color: theme.palette.blue.main,
    }
];
