import { IStory } from './components/story/types.ts';
import { theme } from '../../style/theme.ts';
import { Slide_4_1 } from './components/slides/slide_4_1.tsx';
import { Slide_4_2 } from './components/slides/slide_4_2.tsx';
import { Slide_2_1 } from './components/slides/slide_2_1.tsx';
import { Slide_2_2 } from './components/slides/slide_2_2.tsx';
import { Slide_2_3 } from './components/slides/slide_2_3.tsx';
import { Slide_3_1 } from './components/slides/slide_3_1.tsx';
import { Slide_3_3 } from './components/slides/slide_3_3.tsx';
import { Slide_3_2 } from './components/slides/slide_3_2.tsx';
import { Slide_1_4 } from './components/slides/slide_1_4.tsx';
import { Slide_1_1 } from './components/slides/slide_1_1.tsx';
import { Slide_1_2 } from './components/slides/slide_1_2.tsx';
import { Slide_1_3 } from './components/slides/slide_1_3.tsx';
import { Slide_5_1 } from './components/slides/slide_5_1.tsx';
import { Slide_5_3 } from './components/slides/slide_5_3.tsx';
import { Slide_5_2 } from './components/slides/slide_5_2.tsx';
import { Slide_5_4 } from './components/slides/slide_5_4.tsx';

export const MAX_WIDTH_MOBILE = 64 * 8;

export const STORIES: IStory[] = [
    {
        id: 1,
        label: 'Как добавлять кэкшбэк',
        imgUrl: './stories/create.png',
        color: theme.palette.purple.main,
        slides: [
            Slide_1_1,
            Slide_1_2,
            Slide_1_3,
            Slide_1_4,
        ],
    },
    {
        id: 2,
        label: 'Какую группировку выбрать',
        imgUrl: './stories/create.png',
        color: theme.palette.green.main,
        slides: [
            Slide_2_1,
            Slide_2_2,
            Slide_2_3,
        ],
    },
    {
        id: 3,
        label: 'Кэшбэк на следующий месяц',
        imgUrl: './stories/create.png',
        color: theme.palette.yellow.main,
        slides: [
            Slide_3_1,
            Slide_3_2,
            Slide_3_3,
        ],
    },
    {
        id: 4,
        label: 'Как изменить порядок',
        imgUrl: './stories/create.png',
        color: theme.palette.blue.main,
        slides: [
            Slide_4_1,
            Slide_4_2,
        ],
    },
    {
        id: 5,
        label: 'Поиск и МСС коды',
        imgUrl: './stories/create.png',
        color: theme.palette.brown.main,
        slides: [
            Slide_5_1,
            Slide_5_2,
            Slide_5_3,
            Slide_5_4,
        ],
    },
];
