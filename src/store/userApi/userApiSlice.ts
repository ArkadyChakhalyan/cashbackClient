import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../constants.ts';
import { EFetchMethod } from '../types.ts';
import { IUser } from 'cashback-check-types';
import { getAuthToken } from '../../selectors/getAuthToken.ts';

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_API_URL}/users`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${getAuthToken()}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUser: builder.query<IUser, null>({
            query: () => ({
                url: '/me',
                method: EFetchMethod.GET,
            }),
        }),
        updateUser: builder.mutation({
            query: (body: Partial<IUser>) => ({
                url: '/me',
                method: EFetchMethod.PUT,
                body
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    userApiSlice.util.updateQueryData('getUser', null, (draftUser) => {
                        // Update the user data optimistically
                        Object.assign(draftUser, id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResult.undo();
                }
            },
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: '/me',
                method: EFetchMethod.DELETE,
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useLazyGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApiSlice;
