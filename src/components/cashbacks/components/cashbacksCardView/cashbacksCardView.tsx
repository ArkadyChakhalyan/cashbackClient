import React, { FC, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { ICashbackCardGroup, TCashbackCardViewProps } from './types.ts';
import { useUpdateCashbackMutation } from '../../../../store/cashbackApi/cashbackApiSlice.ts';
import { CashbackCardGroup } from './components/cashbackCardGroup/cashbackCardGroup.tsx';
import { getCashbacksGroupedByCard } from './selectors/getCashbacksGroupedByCard.ts';
import { Box } from '@mui/material';
import {
    CASHBACKS_CARD_VIEW_DROP_ERROR,
    CASHBACKS_CARD_VIEW_DROPPABLE_CASHBACK,
    CASHBACKS_CARD_VIEW_DROPPABLE_GROUP
} from './constants.ts';
import { showErrorSnackbar } from '../../../snackbarStack/helpers/showErrorSnackbar.ts';

export const CashbacksCardView: FC<TCashbackCardViewProps> = ({
    cashbacks,
}) => {
    const [updateCashback, {
        isLoading,
        isError,
        isSuccess,
        reset,
    }] = useUpdateCashbackMutation();

    const [groupedCashbacks, setGroupedCashbacks] = useState([]);
    const [isDisabled, setDisabled] = useState(null);
    const isUpdateRef = useRef(null);

    useEffect(() => {
        if (isUpdateRef.current) return;
        setGroupedCashbacks(getCashbacksGroupedByCard(cashbacks));
    }, [cashbacks]);

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const rollback = [...groupedCashbacks];
        const destIndex = result.destination.index;
        const sourceIndex = result.source.index;
        if (result.type === CASHBACKS_CARD_VIEW_DROPPABLE_CASHBACK) {
            const destCard = result.destination.droppableId;
            const sourceCard = result.source.droppableId;
            const sourceGroup = groupedCashbacks.find(group => `${group.bank}${group.card?.name || ''}` === sourceCard);
            const sourceGroupCashbacks = sourceGroup.cashbacks;
            const cashback = sourceGroupCashbacks[sourceIndex];
            const destGroup = groupedCashbacks.find(group => `${group.bank}${group.card?.name || ''}` === destCard);
            const isSameGroup = destCard === sourceCard;
            if (!isSameGroup) {
                let isExist = false;
                for (let i = 0; i < destGroup.cashbacks.length; i++) {
                    const { name, percentage, card } = destGroup.cashbacks[i];
                    if (
                        name === cashback.name &&
                        percentage === cashback.percentage &&
                        card?.name === cashback.card?.name
                    ) {
                        isExist = true;
                        break;
                    }
                }
                if (isExist) {
                    showErrorSnackbar(CASHBACKS_CARD_VIEW_DROP_ERROR);
                    return;
                }
            }
            const destGroupCashbacks = destGroup.cashbacks;
            const updatedCashback = { ...cashback };
            let updatedGroupedCashbacks: ICashbackCardGroup[];
            if (isSameGroup) {
                const cashbacks = [...destGroupCashbacks];
                cashbacks.splice(sourceIndex, 1);
                cashbacks.splice(destIndex, 0, updatedCashback);
                const updatedGroup = {
                    ...destGroup,
                    cashbacks,
                };
                updatedGroupedCashbacks = groupedCashbacks.map(group => {
                    if (`${group.bank}${group.card?.name || ''}` === destCard) {
                        return updatedGroup;
                    } else {
                        return group;
                    }
                });
            } else {
                updatedCashback.bank = destGroup.cashbacks[0].bank;
                updatedCashback.card = { ...destGroup.cashbacks[0].card };
                const sourceGroupCashbacks = [...sourceGroup.cashbacks];
                sourceGroupCashbacks.splice(sourceIndex, 1);
                const updatedSourceGroup = {
                    ...sourceGroup,
                    cashbacks: sourceGroupCashbacks,
                };
                const destGroupCashbacks = [...destGroup.cashbacks];
                destGroupCashbacks.splice(destIndex, 0, updatedCashback);
                const updatedDestGroup = {
                    ...destGroup,
                    cashbacks: destGroupCashbacks,
                };
                updatedGroupedCashbacks = groupedCashbacks.map(group => {
                    const groupCard = `${group.bank}${group.card?.name || ''}`;
                    if (groupCard === sourceCard) {
                        return updatedSourceGroup;
                    } else if (groupCard === destCard) {
                        return updatedDestGroup;
                    } else {
                        return group;
                    }
                });
            }
            const flatCashbacks = updatedGroupedCashbacks.reduce((cashbacks, group) => {
                group.cashbacks.forEach(cashback => cashbacks.push(cashback));
                return cashbacks;
            }, []);
            const cashbackIndex = flatCashbacks.findIndex(cashback => cashback.id === updatedCashback.id);
            const beforeIndex = cashbackIndex - 1;
            const afterIndex = cashbackIndex + 1;
            const beforeCardOrderNumber = flatCashbacks[beforeIndex]?.cardOrderNumber ?? -1;
            const afterCardOrderNumber = flatCashbacks[afterIndex]?.cardOrderNumber ?? beforeCardOrderNumber + 1;
            updatedCashback.cardOrderNumber = (beforeCardOrderNumber + afterCardOrderNumber) / 2;
            setGroupedCashbacks(updatedGroupedCashbacks);
            try {
                updateCashback(updatedCashback);
            } catch {
                setGroupedCashbacks(rollback);
            }
        } else {
            const updatedGroup: ICashbackCardGroup = { ...groupedCashbacks[sourceIndex] };
            const updatedGroups = [...groupedCashbacks];
            updatedGroups.splice(sourceIndex, 1);
            updatedGroups.splice(destIndex, 0, updatedGroup);
            const beforeGroup = updatedGroups[destIndex - 1];
            const afterGroup = updatedGroups[destIndex + 1];
            const beforeOrderNumber = beforeGroup?.cashbacks?.at(-1).cardOrderNumber ?? -1;
            const afterOrderNumber = afterGroup?.cashbacks?.at(0).cardOrderNumber ?? beforeOrderNumber + 1;
            const length = updatedGroup.cashbacks.length;
            const step = (afterOrderNumber - beforeOrderNumber) / (length + 1);
            const orderNumbers = length === 1 ? [(afterOrderNumber + beforeOrderNumber) / 2]
                : Array.from({ length: length }, (_, i) => beforeOrderNumber + (i + 1) * step);
            updatedGroup.cashbacks = updatedGroup.cashbacks.map((cashback, index) => {
                return {
                    ...cashback,
                    cardOrderNumber: orderNumbers[index],
                };
            });
            setGroupedCashbacks(updatedGroups);
            try {
                isUpdateRef.current = true;
                await updatedGroup.cashbacks.forEach((cashback) => updateCashback(cashback));
                setTimeout(() => {
                    isUpdateRef.current = false;
                }, 500);
            } catch {
                setGroupedCashbacks(rollback);
            }
        }
    };

    useEffect(() => {
        if (!isError) return;
        showErrorSnackbar();
    }, [isError]);

    return <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'banks'} type={CASHBACKS_CARD_VIEW_DROPPABLE_GROUP}>
            {(provided, snapshot) => (
                <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    flexGrow={1}
                >
                    {groupedCashbacks.map(({ card, bank, cashbacks }, index) => (
                        <Draggable
                            key={`${bank}${card?.name || ''}`}
                            draggableId={`${bank}${card?.name || ''}`}
                            index={index}
                            isDragDisabled={isDisabled}
                        >
                            {(provided, snapshot) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{ pb: 2 }}
                                >
                                    <CashbackCardGroup
                                        card={card}
                                        bank={bank}
                                        cashbacks={cashbacks}
                                        isDragging={snapshot.isDragging}
                                        setGroupDragDisabled={setDisabled}
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
