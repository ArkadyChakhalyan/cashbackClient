import { EBank } from 'cashback-check-types';
import { SxProps, Theme } from '@mui/material';

export type TCashbackBankProps = {
    bank: EBank,
    size?: string;
    sx?: SxProps<Theme>
};
