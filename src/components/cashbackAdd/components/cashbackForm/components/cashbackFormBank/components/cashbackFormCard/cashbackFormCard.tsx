import React, { FC, useEffect } from 'react';
import { TCashbackFormCardProps } from './types.ts';
import { CashbackFormChips } from '../../../cashbackFormChips/cashbackFormChips.tsx';
import { CASHBACK_FORM_CARD_ADD, CASHBACK_FORM_CARD_NOT_FOUND, CASHBACK_FORM_DUPLICATE_ERROR } from './constants.ts';
import { useSelector } from 'react-redux';
import { getCards } from '../../../../../../../../store/cardApi/selectors/getCards.ts';
import {
    useCreateCardMutation,
    useDeleteCardMutation,
    useUpdateCardMutation
} from '../../../../../../../../store/cardApi/cardApiSlice.ts';
import { showErrorSnackbar } from '../../../../../../../snackbarStack/helpers/showErrorSnackbar.ts';

export const CashbackFormCard: FC<TCashbackFormCardProps> = ({
    bank,
    card,
    setCard,
}) => {
    const cards = useSelector(getCards).filter(card => card.bank === bank);

    const [deleteCard, {
        isLoading: isDeleteLoading,
        isError: isDeleteError,
        isSuccess: isDeleteSuccess,
    }] = useDeleteCardMutation();

    const [addCard, {
        isLoading: isAddLoading,
        isError: isAddError,
        isSuccess: isAddSuccess,
    }] = useCreateCardMutation();

    const [updateCard, {
        isLoading: isUpdateLoading,
        isError: isUpdateError,
        isSuccess: isUpdateSuccess,
    }] = useUpdateCardMutation();

    const onAdd = async (name: string) => {
        const card = { name, bank };
        await addCard(card);
        setCard(card);
    };

    const onChange = (
        prevName: string,
        newName: string,
    ) => {
        updateCard({ prevName, newName, bank });
    };

    const onDelete = (name: string) => {
        deleteCard({ name, bank });
    };

    useEffect(() => {
        if (!isAddError && !isDeleteError && !isUpdateError) return;
        showErrorSnackbar();
    }, [isAddError, isDeleteError, isUpdateError]);

    useEffect(() => {
        setCard(null);
    }, [bank]);

    return <CashbackFormChips
        addLabel={CASHBACK_FORM_CARD_ADD}
        chips={cards.map(card => card.name)}
        isDisabled={isAddLoading || isUpdateLoading || isDeleteLoading}
        duplicateError={CASHBACK_FORM_DUPLICATE_ERROR}
        onAdd={bank && onAdd}
        onChange={onChange}
        onDelete={onDelete}
        notFoundLabel={CASHBACK_FORM_CARD_NOT_FOUND}
        value={card && card.name}
        onSelect={(value) => setCard(cards.find(card => card.name === value))}
    />;
}
