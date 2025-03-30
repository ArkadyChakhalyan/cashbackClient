import ViewHeadlineRoundedIcon from '@mui/icons-material/ViewHeadlineRounded';
import { ECashbacksView } from 'cashback-check-types';
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import { CardIcon } from '../../../../../../../icons/CardIcon.tsx';

export const VIEW_TYPE_OPTIONS= {
    [ECashbacksView.DEFAULT]: {
        icon: ViewHeadlineRoundedIcon,
        tooltip: 'Без группировки',
        nextView: ECashbacksView.BANK,
    },
    [ECashbacksView.BANK]: {
        icon: ViewStreamRoundedIcon,
        tooltip: 'Группировка по банкам',
        nextView: ECashbacksView.CARD,
    },
    [ECashbacksView.CARD]: {
        icon: CardIcon,
        tooltip: 'Группировка по картам',
        nextView: ECashbacksView.DEFAULT,
    },
};

