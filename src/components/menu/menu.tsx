import { alpha, IconButton, Menu as MuiMenu, SwipeableDrawer } from '@mui/material';
import React, { FC } from 'react';
import { TMenuProps } from './types.ts';
import { getIsMobile } from '../../selectors/getIsMobile.ts';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { theme } from '../../style/theme.ts';
import { MenuItem } from './menuItem/menuItem.tsx';
import { getIsNewIphonePWA } from '../../selectors/getIsNewIphonePWA.ts';
import { useDisableScroll } from '../../customHooks/useDisableScroll.ts';

export const Menu: FC<TMenuProps> = ({
    anchorEl,
    items,
    onClose,
    ...props
}) => {
    const isMobile = getIsMobile();
    useDisableScroll(!!anchorEl);
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
                slotProps={{
                    ...(props.slotProps || {}),
                    paper: {
                        ...(props.slotProps?.paper || {}),
                        sx: {
                            ...menuStyle,
                            //@ts-ignore
                            ...(props.slotProps?.paper?.sx || {}),
                        },
                    },
                }}
            >
                {menuItems}
            </MuiMenu>
        }
        <SwipeableDrawer
            open={isMobile && !!anchorEl}
            onClose={() => onClose(null, null)}
            ModalProps={{ keepMounted: true }}
            PaperProps={{
                sx: { ...paperStyle, pb: getIsNewIphonePWA() ? 6 : 4},
            }}
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
    background: 'none !important',
    boxShadow: 'none !important',
};

const paperStyle = {
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: 8,
    px: 2,
    borderRadius: theme.spacing(5),
    bgcolor: alpha(theme.palette.common.white, 0.15),
    backdropFilter: 'blur(12px)',
    overflow: 'hidden',
    margin: 'auto',
    '& > .MuiMenuItem-root': {
        width: '100%',
        height: theme.spacing(6),
    }
};

const menuStyle = {
    bgcolor: alpha(theme.palette.common.white, 0.15),
    backdropFilter: 'blur(6px)',
};
