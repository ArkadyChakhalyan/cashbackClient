import { userApiSlice } from '../userApiSlice.ts';
import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../types.ts';
import { IUser } from 'cashback-check-types/user';

export const selectUserResult = userApiSlice.endpoints.getUser.select(null);

export const getUser: (state: IState) => IUser = createSelector(
    selectUserResult,
    usersResult => usersResult?.data
)
