import { useNavigate } from 'react-router-dom';
import { theme } from '../../style/theme.ts';
import { Box, Button, Stack } from '@mui/material';
import { LANDING_PAGE_BLOCKS, LANDING_PAGE_LOGIN } from './constants.ts';
import { ERoutes } from '../../router/types.ts';
import { Block } from '../../components/block/block.tsx';

export const LandingPage = () => {
    const navigate = useNavigate();

    return <Stack sx={containerStyle}>
        {LANDING_PAGE_BLOCKS.map(block => {
            const {
                img,
                isImgContainer,
                isRevered,
                title,
                text,
            } = block;
            const imgEl = <Box component={'img'} alt={'preview'} src={img} />;
            return <Block
                key={title}
                title={title}
                text={text}
                img={isImgContainer ? <Stack sx={imageStyle}>{imgEl}</Stack> : imgEl}
                isReversed={isRevered}
            />;
        })}
        <Button
            sx={buttonStyle}
            onClick={() => navigate('/' + ERoutes.LOGIN)}
        >
            {LANDING_PAGE_LOGIN}
        </Button>
    </Stack>;
}

const containerStyle = {
    height: `calc(100% - ${theme.spacing(8)})`,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    pt: 2,
    pb: 20,
    gap: 5,
    [theme.breakpoints.down('sm')]: {
        gap: 3,
        pt: 3,
        pb: 14,
    }
};

const imageStyle = {
    p: 3,
    borderRadius: theme.spacing(4),
    bgcolor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
        mr: 2,
    },
}

const buttonStyle = {
    position: 'absolute',
    bottom: theme.spacing(7),
    width: theme.spacing(28),
    [theme.breakpoints.down('sm')]: {
        bottom: theme.spacing(3.75),
        height: theme.spacing(6.5),
    }
};
