import { MenuProps } from '@mui/material';
import { TMenuItemProps } from './menuItem/types.ts';

export type TMenuProps = MenuProps & {
    items: TMenuItemProps[];
}
