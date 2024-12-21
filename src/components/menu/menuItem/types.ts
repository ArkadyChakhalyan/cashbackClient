import { MenuItemProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

export type TMenuItemProps = MenuItemProps & {
    icon: OverridableComponent<SvgIconTypeMap>;
    isDivided?: boolean;
    label: string;
    shortLabel?: string;
    onClick: (event: React.MouseEvent) => void;
}
