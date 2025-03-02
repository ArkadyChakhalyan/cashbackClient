import React, { FC } from 'react';
import { alpha, Stack, Typography } from '@mui/material';
import { TCashbackCardProps } from './types.ts';
import { theme } from '../../../../../../style/theme.ts';

export const CashbackCard: FC<TCashbackCardProps> = ({
    name,
}) => {
    return <Stack sx={cardStyle}>
        <Typography
            variant={'body2'}
            fontSize={12}
            fontWeight={500}
            noWrap
        >
            {name}
        </Typography>
    </Stack>;
}

const cardStyle = {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 'fit-content',
    height: theme.spacing(3.5),
    maxWidth: theme.spacing(12),
    px: theme.spacing(),
    bgcolor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
        maxWidth: theme.spacing(6),
    }
};
