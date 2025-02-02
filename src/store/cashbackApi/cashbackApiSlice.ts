import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../constants.ts';
import { EFetchMethod } from '../types.ts';
import { ICashback } from 'cashback-check-types';
import { getAuthToken } from '../../selectors/getAuthToken.ts';

export const cashbackApiSlice = createApi({
    reducerPath: 'cashbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_API_URL}/cashback`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${getAuthToken()}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCashbacks: builder.query<ICashback[], null>({
            query: () => ({
                url: '',
                method: EFetchMethod.GET,
            }),
        }),
        createCashback: builder.mutation({
            query: (body: Partial<ICashback>) => ({
                url: '',
                method: EFetchMethod.POST,
                body
            }),
            async onQueryStarted(cashback, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(cashbackApiSlice.util.updateQueryData(
                    'getCashbacks',
                    null,
                    (cashbacks) => {
                        cashbacks.push(data);
                    },
                ));
            },
        }),
        updateCashback: builder.mutation({
            query: (body: Partial<ICashback>) => ({
                url: `/${body.id}`,
                method: EFetchMethod.PUT,
                body
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(cashbackApiSlice.util.updateQueryData(
                    'getCashbacks',
                    null,
                    (cashbacks) => {
                        const idx = cashbacks.findIndex(cashback => cashback.id === data.id);
                        if (idx > -1) {
                            cashbacks.splice(idx, 1, data);
                        }
                    }
                ));
            },
        }),
        deleteCashback: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: EFetchMethod.DELETE,
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(cashbackApiSlice.util.updateQueryData(
                    'getCashbacks',
                    null,
                    (cashbacks) => {
                        const idx = cashbacks.findIndex(cashback => cashback.id === data.id);
                        if (idx > -1) {
                            cashbacks.splice(idx, 1);
                        }
                    }
                ));
            },
        }),
    }),
});

export const {
    useDeleteCashbackMutation,
    useCreateCashbackMutation,
    useUpdateCashbackMutation,
    useGetCashbacksQuery,
    useLazyGetCashbacksQuery,
} = cashbackApiSlice;
