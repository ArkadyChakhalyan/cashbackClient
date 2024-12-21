import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { FC, ReactNode } from 'react';
import { SvgIconProps } from '@mui/material';

type TCustomIcon = (props: SvgIconProps) => ReactNode;

export type TSignInButtonProps = {
    Icon:  OverridableComponent<SvgIconTypeMap> | TCustomIcon;
    label: string;
    provider: string;
}
