import { Box } from '@mui/material';
import { BANKS } from '../../constants.ts';
import { FC } from 'react';
import { TCashbackBankProps } from './types.ts';

export const CashbackBank: FC<TCashbackBankProps> = ({
    bank,
    size,
}) => {
    const { iconUrl, name } = BANKS.find(item => item.value === bank);
    return <Box
        sx={{
            ...bankStyle,
            width: size,
            height: size,
        }}
        component={'img'}
        src={iconUrl}
        alt={name}
    />;
}

const bankStyle = {
    borderRadius: '50%',
    overflow: 'hidden',
    pointerEvents: 'none',
    userSelect: 'none',
};
