import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { TCashbackDefaultViewProps } from './types.ts';
import { Cashback } from '../cashback/cashback.tsx';
import { useUpdateCashbackMutation } from '../../../../store/cashbackApi/cashbackApiSlice.ts';
import { showErrorSnackbar } from '../../../snackbarStack/helpers/showErrorSnackbar.ts';
import { useSelector } from 'react-redux';
import { getIsSearchMode } from '../../../../store/cashbacks/selectors/getIsSearchMode.ts';
import { getCashbackPeriod } from '../../../../selectors/getCashbackPeriod.ts';
import { MONTH_MAP } from '../../../../constants.ts';
import { theme } from '../../../../style/theme.ts';

export const CashbacksDefaultView: FC<TCashbackDefaultViewProps> = ({
    cashbacks: _cashbacks,
}) => {
    const [updateCashback, {
        isLoading,
        isError,
        isSuccess,
        reset,
    }] = useUpdateCashbackMutation();

    const isSearchMode = useSelector(getIsSearchMode);

    const [cashbacks, setCashbacks] = useState([]);

    useEffect(() => {
        const cashbacks = [..._cashbacks];
        if (!isSearchMode) cashbacks.sort((a, b) => a.orderNumber - b.orderNumber);
        setCashbacks(cashbacks);
    }, [_cashbacks]);

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const rollback = [...cashbacks];
        const destIndex = result.destination.index;
        const sourceIndex = result.source.index;
        const updatedCashbacks = [...cashbacks];
        const cashback = cashbacks[sourceIndex];
        const updatedCashback = { ...cashback };
        updatedCashbacks.splice(sourceIndex, 1);
        updatedCashbacks.splice(destIndex, 0, updatedCashback);
        const cashbackIndex = updatedCashbacks.findIndex(cashback => cashback.id === updatedCashback.id);
        const beforeIndex = cashbackIndex - 1;
        const afterIndex = cashbackIndex + 1;
        const beforeOrderNumber = updatedCashbacks[beforeIndex]?.orderNumber ?? -1;
        const afterOrderNumber = updatedCashbacks[afterIndex]?.orderNumber ?? beforeOrderNumber + 1;
        updatedCashback.orderNumber = (beforeOrderNumber + afterOrderNumber) / 2;
        setCashbacks(updatedCashbacks)
        try {
            updateCashback(updatedCashback);
        } catch {
            setCashbacks(rollback);
        }
    };

    useEffect(() => {
        if (!isError) return;
        showErrorSnackbar();
    }, [isError]);

    return <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'default'}>
            {(provided, snapshot) => (
                <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    flexGrow={1}
                >
                    {cashbacks.map((cashback, index) => (
                        <Draggable key={cashback.id} draggableId={cashback.id} index={index} isDragDisabled={isSearchMode}>
                            {(provided, snapshot) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{ pb: 1 }}
                                >
                                    {
                                        isSearchMode &&
                                        (
                                            !index ||
                                            getCashbackPeriod(cashback.timestamp) !==getCashbackPeriod(cashbacks[index - 1].timestamp)
                                        ) &&
                                        <Typography sx={{ m: theme.spacing(1, 0, 1.5, 0), opacity: 0.7 }} variant={'subtitle2'}>
                                            Категории в {MONTH_MAP[new Date(cashback.timestamp).getMonth()]}
                                        </Typography>
                                    }
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
                                    />
                                </Box>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>
    </DragDropContext>;
}
