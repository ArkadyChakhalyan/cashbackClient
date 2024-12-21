import React from 'react';
import { alpha, Box, Paper, Stack, Typography } from '@mui/material';
import { TCashbackGroupProps } from './types.ts';
import { Cashback } from '../../../cashback/cashback.tsx';
import { theme } from '../../../../../../style/theme.ts';
import { BANKS } from '../../../../../../constants.ts';
import { CashbackBank } from '../../../../../cashbackBank/cashbackBank.tsx';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { CASHBACKS_BANK_VIEW_DROPPABLE_CASHBACK } from '../../constants.ts';

export const CashbackGroup = ({
    bank,
    cashbacks,
    isDragging,
    setGroupDragDisabled,
}: TCashbackGroupProps) => {
    const { name, value } = BANKS.find(item => item.value === bank);

    return <Paper
        sx={{
            ...containerStyle,
            transform: isDragging ? 'scale(1.01)' : '',
            boxShadow: isDragging ? theme.shadows[5]: '',
        }}
    >
        <Stack sx={headerStyle} spacing={0.25}>
            <CashbackBank bank={value} size={theme.spacing(3)} />
            <Typography variant={'subtitle2'} sx={{ pl: 1, fontWeight: 500, userSelect: 'none' }}>
                {name}
            </Typography>
        </Stack>
        <Droppable droppableId={bank} type={CASHBACKS_BANK_VIEW_DROPPABLE_CASHBACK}>
            {(provided, snapshot) => (
                <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    flexGrow={1}
                    sx={{
                        ...boxStyle,
                        '&:before': {
                            ...boxStyle['&:before'],
                            bgcolor: snapshot.isDraggingOver ? alpha(theme.palette.common.white, 0.01) : '',
                        }
                    }}
                >
                    {cashbacks.map((cashback, index) => (
                        <Draggable key={cashback.id} draggableId={cashback.id} index={index}>
                            {(provided, snapshot) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{ pb: theme.spacing() }}
                                >
                                    <Cashback
                                        key={cashback.id}
                                        bank={cashback.bank}
                                        color={cashback.color}
                                        icon={cashback.icon}
                                        id={cashback.id}
                                        name={cashback.name}
                                        percentage={cashback.percentage}
                                        isDragging={snapshot.isDragging}
                                        setGroupDragDisabled={setGroupDragDisabled}
                                    />
                                </Box>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>
    </Paper>;
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    pb: 1,
    borderRadius: theme.spacing(3),
    bgcolor: theme.palette.background.default,
    overflow: 'hidden',
};

const boxStyle = {
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        inset: theme.spacing(-6),
        pointerEvents: 'none',
        transition: 'background 0.25s ease-in-out'
    }
};

const headerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    mb: theme.spacing(1.5),
};

