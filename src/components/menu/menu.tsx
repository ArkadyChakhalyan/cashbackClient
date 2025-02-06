import { IconButton, Menu as MuiMenu, SwipeableDrawer } from '@mui/material';
import React, { FC } from 'react';
import { TMenuProps } from './types.ts';
import { getIsMobile } from '../../selectors/getIsMobile.ts';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { theme } from '../../style/theme.ts';
import { MenuItem } from './menuItem/menuItem.tsx';

export const Menu: FC<TMenuProps> = ({
    anchorEl,
    items,
    onClose,
    ...props
}) => {
    const isMobile = getIsMobile();
    const closeButton = <IconButton
        sx={closeButtonStyle}
        onClick={() => onClose(null, null)}
    >
        <CloseRoundedIcon />
    </IconButton>;

    const menuItems = items.map(({ onClick, ...item }) => (
        <MenuItem
            key={item.label}
            onClick={(e) => {
                onClick(e);
                onClose(null, null);
            }}
            {...item}
        />
    ));

    return <>
        {!isMobile &&
            <MuiMenu
                anchorEl={anchorEl}
                onClose={onClose}
                {...props}
            >
                {menuItems}
            </MuiMenu>
        }
        <SwipeableDrawer
            open={isMobile && !!anchorEl}
            onClose={() => onClose(null, null)}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: paperStyle }}
            SwipeAreaProps={{ sx: { display: 'none' }}}
            onOpen={() => {}}
        >
            <>
                {closeButton}
                {menuItems}
            </>
        </SwipeableDrawer>
    </>
}

const closeButtonStyle = {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    bgcolor: theme.palette.background.paper,
};

const paperStyle = {
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: theme.spacing(8, 2, 3),
    borderRadius: theme.spacing(5),
    bgcolor: theme.palette.background.default,
    overflow: 'hidden',
    margin: 'auto',
    '& > .MuiMenuItem-root': {
        width: '100%',
        height: theme.spacing(6),
    }
};
