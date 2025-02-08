import { Paper, SwipeableDrawer, Modal as MuiModal, IconButton } from '@mui/material';
import React, { FC } from 'react';
import { TModalProps } from './types.ts';
import { getIsMobile } from '../../selectors/getIsMobile.ts';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { theme } from '../../style/theme.ts';
import { getIsIphoneXorNewer } from '../../selectors/getIsIphoneXorNewer.ts';
import { getIsPWA } from '../../selectors/getIsPWA.ts';

export const Modal: FC<TModalProps> = ({
    body,
    isOpen,
    onClose,
    onKeyDown,
}) => {
    const isMobile = getIsMobile();
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
            slotProps={{ backdrop: { sx: { backdropFilter: 'blur(3px)' } }}}
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
                sx: { ...paperStyle, pb: getIsIphoneXorNewer() && getIsPWA() ? 6 : 4},
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
    bgcolor: theme.palette.background.paper,
};

const paperStyle = {
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    pt: 5,
    px: 3,
    borderRadius: theme.spacing(5),
    bgcolor: theme.palette.background.default,
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
