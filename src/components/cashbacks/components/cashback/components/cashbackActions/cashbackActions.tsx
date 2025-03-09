import React, { FC, useState } from 'react';
import { alpha, Grow, IconButton } from '@mui/material';
import { TCashbackActionsProps } from './types.ts';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { theme } from '../../../../../../style/theme.ts';
import { setOpenedActionsCashbackIdAC } from '../../../../../../store/cashbacks/cashbackReducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getCashbacksView } from '../../../../../../store/userApi/selectors/getCashbacksView.ts';
import { ECashbacksView } from 'cashback-check-types';
import { getIsSearchMode } from '../../../../../../store/cashbacks/selectors/getIsSearchMode.ts';
import { getIsMobile } from '../../../../../../selectors/getIsMobile.ts';
import { CashbackActionsMenu } from './components/cashbackActionsMenu/cashbackActionsMenu.tsx';

export const CashbackActions: FC<TCashbackActionsProps> = ({
    id,
}) => {
    const dispatch = useDispatch();

    const [anchor, setAnchor] = useState(null);
    const view = useSelector(getCashbacksView);
    const isSearchMode = useSelector(getIsSearchMode);

    const isMobile = getIsMobile();

    return <>
        <Grow appear in={!isSearchMode} timeout={300}>
            <IconButton
                sx={{
                    ...actionsStyle,
                    bgcolor: view === ECashbacksView.BANK ? alpha(theme.palette.common.white, 0.05) : null
                }}
                onClick={(e: React.MouseEvent) => {
                    if (isMobile) {
                        dispatch(setOpenedActionsCashbackIdAC(id));
                    } else {
                        setAnchor(e.currentTarget);
                    }
                }}
            >
                <MoreHorizRoundedIcon />
            </IconButton>
        </Grow>
        {!isMobile &&
            <CashbackActionsMenu
                id={id}
                anchor={anchor}
                onClose={() => setAnchor(null)}
            />
        }
    </>;
}

const actionsStyle = {
    position: 'relative',
    width: theme.spacing(4),
    height: theme.spacing(4),
    '&:before': {
        content: '""',
        position: 'absolute',
        inset: theme.spacing(-0.5),
    }
};
