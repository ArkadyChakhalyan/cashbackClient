import { Stack } from '@mui/material';
import React from 'react';
import { ViewType } from './components/viewType/viewType.tsx';
import { Search } from './components/search/search.tsx';

export const CashbacksActions = () => {
    return <Stack direction={'row'} gap={1} alignItems={'center'}>
        <Search />
        <ViewType />
    </Stack>;
}
