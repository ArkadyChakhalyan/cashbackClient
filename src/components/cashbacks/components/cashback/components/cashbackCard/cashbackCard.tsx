import React, { FC } from 'react';
import { alpha, Stack, Typography } from '@mui/material';
import { TCashbackCardProps } from './types.ts';
import { theme } from '../../../../../../style/theme.ts';
import { useSelector } from 'react-redux';
import { getIsSearchMode } from '../../../../../../store/cashbacks/selectors/getIsSearchMode.ts';

export const CashbackCard: FC<TCashbackCardProps> = ({
    name,
}) => {
    const isSearchMode = useSelector(getIsSearchMode);

    return <Stack
        sx={{
            ...cardStyle,
            transform: `translateX(${isSearchMode ? theme.spacing(5) : 0})`,
            transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
    >
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
