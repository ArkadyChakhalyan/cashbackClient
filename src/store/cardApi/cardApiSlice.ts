import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../constants.ts';
import { EFetchMethod } from '../types.ts';
import { ICard } from 'cashback-check-types';
import { getAuthToken } from '../../selectors/getAuthToken.ts';
import { cashbackApiSlice } from '../cashbackApi/cashbackApiSlice.ts';

export const cardApiSlice = createApi({
    reducerPath: 'cardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_API_URL}/card`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${getAuthToken()}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCards: builder.query<ICard[], null>({
            query: () => ({
                url: '',
                method: EFetchMethod.GET,
            }),
        }),
        createCard: builder.mutation({
            query: (body: Partial<ICard>) => ({
                url: '',
                method: EFetchMethod.POST,
                body
            }),
            async onQueryStarted(card, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(cardApiSlice.util.updateQueryData(
                    'getCards',
                    null,
                    (cards) => {
                        cards.push(data);
                    },
                ));
            },
        }),
        updateCard: builder.mutation({
            query: ({ prevName, newName, bank }) => ({
                url: `/${prevName}/${bank}`,
                method: EFetchMethod.PUT,
                body: { name: newName, bank },
            }),
            async onQueryStarted(card, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(cardApiSlice.util.updateQueryData(
                    'getCards',
                    null,
                    (cards) => {
                        const idx = cards.findIndex(item => card.prevName === item.name);
                        if (idx > -1) {
                            cards.splice(idx, 1, data);
                        }
                    }
                ));
                dispatch(cashbackApiSlice.util.updateQueryData(
                    'getCashbacks',
                    null,
                    (cashbacks) => {
                        for (let i = 0; i < cashbacks.length; i++) {
                            const idx = cashbacks.findIndex(cashback => {
                                return cashback.bank === card.bank &&
                                    cashback.card &&
                                    cashback.card.name === card.prevName;
                            });
                            if (idx > -1) {
                                cashbacks.splice(idx, 1, { ...cashbacks[idx], card: data });
                            }
                        }
                    }
                ));
            },
        }),
        deleteCard: builder.mutation({
            query: ({ name, bank }) => ({
                url: `/${name}/${bank}`,
                method: EFetchMethod.DELETE,
            }),
            async onQueryStarted(card, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(cardApiSlice.util.updateQueryData(
                    'getCards',
                    null,
                    (cards) => {
                        const idx = cards.findIndex(card => card.name === data.name && card.bank === data.bank);
                        if (idx > -1) {
                            cards.splice(idx, 1);
                        }
                    }
                ));
                dispatch(cashbackApiSlice.util.updateQueryData(
                    'getCashbacks',
                    null,
                    (cashbacks) => {
                        for (let i = 0; i < cashbacks.length; i++) {
                            const idx = cashbacks.findIndex(cashback => {
                                return cashback.bank === card.bank &&
                                    cashback.card &&
                                    cashback.card.name === card.name;
                            });
                            if (idx > -1) {
                                cashbacks.splice(idx, 1, { ...cashbacks[idx], card: null });
                            }
                        }
                    }
                ));
            },
        }),
    }),
});

export const {
    useDeleteCardMutation,
    useCreateCardMutation,
    useUpdateCardMutation,
    useGetCardsQuery,
    useLazyGetCardsQuery,
} = cardApiSlice;
