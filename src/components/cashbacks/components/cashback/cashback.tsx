import React, { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { TCashbackProps } from './types.ts';
import { theme } from '../../../../style/theme.ts';
import { CASHBACK_COLOR_MAP, CASHBACK_ICON_MAP } from './constants.ts';
import { CashbackActions } from './components/cashbackActions/cashbackActions.tsx';
import { CashbackBank } from '../../../cashbackBank/cashbackBank.tsx';
import { useSelector } from 'react-redux';
import { getCashbacksView } from '../../../../store/userApi/selectors/getCashbacksView.ts';
import { getIsSearchMode } from '../../../../store/cashbacks/selectors/getIsSearchMode.ts';
import { CashbackCard } from './components/cashbackCard/cashbackCard.tsx';
import { CASHBACKS_GROUPED_VIEWS } from '../../constants.ts';
import { ECashbacksView } from 'cashback-check-types';

export const Cashback: FC<TCashbackProps> = ({
    bank,
    card,
    color,
    icon,
    id,
    isDragging,
    name,
    percentage,
    setGroupDragDisabled,
}) => {
    const Icon = CASHBACK_ICON_MAP[icon];
    const view = useSelector(getCashbacksView);
    const isSearchMode = useSelector(getIsSearchMode);

    const isGroupView = CASHBACKS_GROUPED_VIEWS.includes(view);
    const isCardView = view === ECashbacksView.CARD;

    return <Paper
        sx={{
            ...cashbackStyle,
            bgcolor: isGroupView && !isSearchMode ? theme.palette.background.paper : theme.palette.background.default,
            boxShadow: isDragging ? theme.shadows[5]: '',
            transform: isDragging ? 'scale(1.01)' : '',
        }}
        onMouseEnter={() => setGroupDragDisabled && setGroupDragDisabled(true)}
        onMouseLeave={() => setGroupDragDisabled && setGroupDragDisabled(false)}
    >
        <Stack
            sx={{
                ...iconStyle,
                bgcolor: CASHBACK_COLOR_MAP[color],
            }}
        >
            <Icon />
        </Stack>
        <Typography
            variant={'body1'}
            noWrap
            sx={{
                maxWidth: `calc(100% - ${isCardView ? 0
                    : theme.spacing((isGroupView ? 10.25 : 15.5) + (card ? 14.75 : 0))})`,
                userSelect: 'none',
                [theme.breakpoints.down('sm')]: {
                    maxWidth: `calc(100% - ${isCardView ? 0
                        : theme.spacing((isGroupView ? 10.25 : 15.5) + (card ? 8.75 : 0))})`,
                }
            }}
        >
            {`${percentage}% ${name}`}
        </Typography>
        <Stack sx={actionsStyle} gap={1}>
            {card && (!isCardView || isSearchMode) && <CashbackCard name={card.name} />}
            {(!isGroupView || isSearchMode) &&
                <CashbackBank
                    bank={bank}
                    size={theme.spacing(4)}
                    sx={{
                        transform: `translateX(${isSearchMode ? theme.spacing(5) : 0})`,
                        transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                />}
            <CashbackActions id={id} />
        </Stack>
    </Paper>;
}

const iconStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(4),
    height: theme.spacing(4),
    bgcolor: 'red',
    borderRadius: '50%',

    '.MuiSvgIcon-root': {
        width: theme.spacing(2.5),
        height: theme.spacing(2.5),
    },
};

const cashbackStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    p: theme.spacing(),
    borderRadius: theme.spacing(3),
    bgcolor: theme.palette.background.default,
};

const actionsStyle = {
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    flexDirection: 'row',
};
