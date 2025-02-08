import React, { FC, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { TCashbackDefaultViewProps } from './types.ts';
import { useUpdateCashbackMutation } from '../../../../store/cashbackApi/cashbackApiSlice.ts';
import { CashbackGroup } from './components/cashbackGroup/cashbackGroup.tsx';
import { getCashbacksGroupedByBank } from './selectors/getCashbacksGroupedByBank.ts';
import { ICashbackGroup } from '../../types.ts';
import { Box } from '@mui/material';
import {
    CASHBACKS_BANK_VIEW_DROP_ERROR,
    CASHBACKS_BANK_VIEW_DROPPABLE_CASHBACK,
    CASHBACKS_BANK_VIEW_DROPPABLE_GROUP
} from './constants.ts';
import { showErrorSnackbar } from '../../../snackbarStack/helpers/showErrorSnackbar.ts';

export const CashbacksBankView: FC<TCashbackDefaultViewProps> = ({
    cashbacks,
}) => {
    const [updateCashback, {
        isLoading,
        isError,
        isSuccess,
        reset,
    }] = useUpdateCashbackMutation();
    console.log(cashbacks);

    const [groupedCashbacks, setGroupedCashbacks] = useState([]);
    const [isDisabled, setDisabled] = useState(null);
    const isUpdateRef = useRef(null);

    useEffect(() => {
        if (isUpdateRef.current) return;
        setGroupedCashbacks(getCashbacksGroupedByBank(cashbacks));
    }, [cashbacks]);

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const rollback = [...groupedCashbacks];
        const destIndex = result.destination.index;
        const sourceIndex = result.source.index;
        if (result.type === CASHBACKS_BANK_VIEW_DROPPABLE_CASHBACK) {
            const destBank = result.destination.droppableId;
            const sourceBank = result.source.droppableId;
            const sourceGroup = groupedCashbacks.find(group => group.bank === sourceBank);
            const sourceGroupCashbacks = sourceGroup.cashbacks;
            const cashback = sourceGroupCashbacks[sourceIndex];
            const destGroup = groupedCashbacks.find(group => group.bank === destBank);
            const isSameGroup = destBank === sourceBank;
            if (!isSameGroup) {
                let isExist = false;
                for (let i = 0; i < destGroup.cashbacks.length; i++) {
                    const { name, percentage } = destGroup.cashbacks[i];
                    if (
                        name === cashback.name &&
                        percentage === cashback.percentage
                    ) {
                        isExist = true;
                        break;
                    }
                }
                if (isExist) {
                    showErrorSnackbar(CASHBACKS_BANK_VIEW_DROP_ERROR);
                    return;
                }
            }
            const destGroupCashbacks = destGroup.cashbacks;
            const updatedCashback = { ...cashback };
            let updatedGroupedCashbacks: ICashbackGroup[];
            if (isSameGroup) {
                const cashbacks = [...destGroupCashbacks];
                cashbacks.splice(sourceIndex, 1);
                cashbacks.splice(destIndex, 0, updatedCashback);
                const updatedGroup = {
                    ...destGroup,
                    cashbacks,
                };
                updatedGroupedCashbacks = groupedCashbacks.map(group => {
                    if (group.bank === destBank) {
                        return updatedGroup;
                    } else {
                        return group;
                    }
                });
            } else {
                updatedCashback.bank = destBank;
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
                    if (group.bank === sourceBank) {
                        return updatedSourceGroup;
                    } else if (group.bank === destBank) {
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
            const beforeBankOrderNumber = flatCashbacks[beforeIndex]?.bankOrderNumber ?? -1;
            const afterBankOrderNumber = flatCashbacks[afterIndex]?.bankOrderNumber ?? beforeBankOrderNumber + 1;
            updatedCashback.bankOrderNumber = (beforeBankOrderNumber + afterBankOrderNumber) / 2;
            setGroupedCashbacks(updatedGroupedCashbacks);
            try {
                updateCashback(updatedCashback);
            } catch {
                setGroupedCashbacks(rollback);
            }
        } else {
            const updatedGroup: ICashbackGroup = { ...groupedCashbacks[sourceIndex] };
            const updatedGroups = [...groupedCashbacks];
            updatedGroups.splice(sourceIndex, 1);
            updatedGroups.splice(destIndex, 0, updatedGroup);
            const beforeGroup = updatedGroups[destIndex - 1];
            const afterGroup = updatedGroups[destIndex + 1];
            const beforeOrderNumber = beforeGroup?.cashbacks?.at(-1).bankOrderNumber ?? -1;
            const afterOrderNumber = afterGroup?.cashbacks?.at(-1).bankOrderNumber ?? beforeOrderNumber + 1;
            const length = updatedGroup.cashbacks.length;
            const step = (afterOrderNumber - beforeOrderNumber) / (length + 1);
            const orderNumbers = length === 1 ? [(afterOrderNumber + beforeOrderNumber) / 2]
                : Array.from({ length: length }, (_, i) => beforeOrderNumber + (i + 1) * step);
            updatedGroup.cashbacks = updatedGroup.cashbacks.map((cashback, index) => {
                return {
                    ...cashback,
                    bankOrderNumber: orderNumbers[index],
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
        <Droppable droppableId={'banks'} type={CASHBACKS_BANK_VIEW_DROPPABLE_GROUP}>
            {(provided, snapshot) => (
                <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    flexGrow={1}
                >
                    {groupedCashbacks.map(({ bank, cashbacks }, index) => (
                        <Draggable key={bank} draggableId={bank} index={index} isDragDisabled={isDisabled}>
                            {(provided, snapshot) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{ pb: 2 }}
                                >
                                    <CashbackGroup
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
