import { Divider, ListItemIcon, MenuItem as MuiMenuItem, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TMenuItemProps } from './types.ts';
import { getIsMobile } from '../../../selectors/getIsMobile.ts';
import { theme } from '../../../style/theme.ts';

export const MenuItem: FC<TMenuItemProps> = ({
    icon,
    isDivided,
    label,
    shortLabel,
    ...props
}) => {
    const Icon = icon;
    const isMobile = getIsMobile();

    return <>
        {isDivided && !isMobile && <Divider />}
        <MuiMenuItem {...props}>
            <ListItemIcon>
                <Icon/>
            </ListItemIcon>
            <Typography
                variant={'subtitle2'}
                sx={{
                    fontSize: isMobile ? theme.typography.subtitle1.fontSize : theme.typography.subtitle2.fontSize
                }}
            >
                {shortLabel && !isMobile ? shortLabel : label}
            </Typography>
        </MuiMenuItem>
    </>;
}
