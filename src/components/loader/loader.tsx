import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { theme } from '../../style/theme.ts';

export const Loader = () => {
    const [isShow, setShow] = useState(true);
    const [isHide, setHide] = useState(null);

    useEffect(() => {
        const onLoad = () => {
            setTimeout(() => {
                setHide(true);
                setTimeout(() => {
                    setShow(false);
                }, 400);
            }, 1000);
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);

    if (!isShow) return null;

    return <Stack
        sx={{
            ...containerStyle,
            ...(isHide ? hideStyle : {}),
        }}
    >
        <Box
            component={'img'}
            sx={imgStyle}
            src={'./masked-icon.svg'}
            alt={'logo'}
        />
    </Stack>;
}

const containerStyle = {
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    inset: 0,
    zIndex: 1000,
    bgcolor: theme.palette.darkBackground.main,
    transition: theme.transitions.create('all', {duration: 400, easing: 'ease-in-out'}),
};

const hideStyle = {
    opacity: 0.2,
    scale: 1.1,
};

const imgStyle = {
    width: theme.spacing(24),
    height: theme.spacing(24),
};
