import React from 'react';
import { alpha, Box, Paper, Stack, Typography } from '@mui/material';
import { TCashbackCardGroupProps } from './types.ts';
import { Cashback } from '../../../cashback/cashback.tsx';
import { theme } from '../../../../../../style/theme.ts';
import { BANKS } from '../../../../../../constants.ts';
import { CashbackBank } from '../../../../../cashbackBank/cashbackBank.tsx';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { CASHBACKS_CARD_VIEW_DROPPABLE_CASHBACK } from '../../constants.ts';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';

export const CashbackCardGroup = ({
    bank,
    card,
    cashbacks,
    isDragging,
    setGroupDragDisabled,
}: TCashbackCardGroupProps) => {
    const { name, value } = BANKS.find(item => item.value === bank);

    const groupId = `${bank}${card?.name || ''}`
    const groupName = card ? card.name : name;

    return <Paper
        sx={{
            ...containerStyle,
            backdropFilter: isDragging ? 'blur(6px)' : '',
            transform: isDragging ? 'scale(1.01)' : '',
            boxShadow: isDragging ? theme.shadows[5]: '',
        }}
    >
        <Stack sx={headerStyle}>
            <CashbackBank bank={value} size={theme.spacing(3)} />
            <Typography
                variant={'subtitle2'}
                noWrap
                sx={{
                    ...textStyle,
                    maxWidth: `calc(100% - ${card ? 0 : theme.spacing(9)})`
                }}
            >
                {groupName}
            </Typography>
            {!card && <CreditCardOffIcon sx={noCardStyle} />}
        </Stack>
        <Droppable droppableId={groupId} type={CASHBACKS_CARD_VIEW_DROPPABLE_CASHBACK}>
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
                                    sx={{ pb: 1 }}
                                >
                                    <Cashback
                                        key={cashback.id}
                                        bank={cashback.bank}
                                        card={cashback.card}
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
    bgcolor: alpha(theme.palette.common.white, 0.1),
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        px: 1.5,
        pb: 0.75,
    }
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    mb: theme.spacing(1.5),
    gap: 0.25,
    [theme.breakpoints.down('sm')]: {
        ml: theme.spacing(0.5),
    }
};

const noCardStyle = {
    position: 'absolute',
    right: theme.spacing(0.75),
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0.75,
};

const textStyle = {
    pl: 1,
    fontWeight: 500,
    userSelect: 'none',
};

