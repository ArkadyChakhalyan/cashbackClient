import React, { FC, useEffect, useState } from 'react';
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
import { getShowAddCard } from '../../../../../../../../store/userApi/selectors/getShowAddCard.ts';

export const CashbackFormCard: FC<TCashbackFormCardProps> = ({
    bank,
    card,
    setCard,
}) => {
    const _isShowAddCard = useSelector(getShowAddCard);
    const cards = useSelector(getCards).filter(card => card.bank === bank);
    const [prevBank, setPrevBank] = useState(null);
    const [updatedCardName, setUpdatedCardName] = useState(null);
    const [isShowAddCard, setShowAddCard] = useState(_isShowAddCard);

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

    const onChange = async (
        prevName: string,
        newName: string,
    ) => {
        await updateCard({ prevName, newName, bank });
        if (prevName === card?.name) {
            setUpdatedCardName(newName);
        }
    };

    const onDelete = async (name: string) => {
        return deleteCard({ name, bank });
    };

    useEffect(() => {
        if (!isAddError && !isDeleteError && !isUpdateError) return;
        showErrorSnackbar();
    }, [isAddError, isDeleteError, isUpdateError]);

    useEffect(() => {
        if (!updatedCardName) return;
        setCard(cards.find(card => card.name === updatedCardName));
        setUpdatedCardName(null);
    }, [cards]);

    useEffect(() => {
        setPrevBank(bank);
    }, [bank]);

    useEffect(() => {
        if (!prevBank || prevBank !== bank) return;
        setCard(null);
    }, [bank]);

    useEffect(() => {
        setShowAddCard(_isShowAddCard);
    }, [_isShowAddCard]);

    if (!card && !isShowAddCard) return null;

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
