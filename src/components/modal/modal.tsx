import { alpha, IconButton, Modal as MuiModal, Paper, SwipeableDrawer } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { TModalProps } from './types.ts';
import { getIsMobile } from '../../selectors/getIsMobile.ts';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { theme } from '../../style/theme.ts';
import { getIsNewIphonePWA } from '../../selectors/getIsNewIphonePWA.ts';
import { useDisableScroll } from '../../customHooks/useDisableScroll.ts';

export const Modal: FC<TModalProps> = ({
    body,
    isOpen,
    onClose,
    onKeyDown,
}) => {
    const isMobile = getIsMobile();
    useDisableScroll(isOpen);

    const closeButton = <IconButton
        sx={closeButtonStyle}
        onClick={onClose}
    >
        <CloseRoundedIcon />
    </IconButton>;

    return <>
        <MuiModal
            open={isOpen && !isMobile}
            onClose={onClose}
            slotProps={{ backdrop: { sx: { backdropFilter: 'blur(2px)', background: alpha(theme.palette.common.black, 0.3) } }}}
            onKeyDown={onKeyDown}
        >
            <Paper
                sx={{
                    ...containerStyle,
                    [theme.breakpoints.down(parseInt(theme.spacing(92)))]: {
                        maxWidth: `calc(100% - ${theme.spacing(12)})`
                    }
                }}
            >
                {closeButton}
                {body}
            </Paper>
        </MuiModal>
        <SwipeableDrawer
            open={isMobile && isOpen}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            PaperProps={{
                sx: { ...paperStyle, pb: getIsNewIphonePWA() ? 6 : 4},
            }}
            onOpen={() => {}}
            onKeyDown={onKeyDown}
        >
            <>
                {closeButton}
                {body}
            </>
        </SwipeableDrawer>
    </>;
}

const closeButtonStyle = {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    background: 'none !important',
};

const paperStyle = {
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    pt: 5,
    px: 3,
    pb: 3,
    borderRadius: theme.spacing(5),
    bgcolor: alpha(theme.palette.common.white, 0.15),
    backdropFilter: 'blur(10px)',
    overflow: 'hidden',
    margin: 'auto',
};

const containerStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: `calc(100% - ${theme.spacing(6)})`,
    ...paperStyle,
};
