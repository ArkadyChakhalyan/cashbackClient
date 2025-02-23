import { configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from './userApi/userApiSlice.ts';
import { cashbackApiSlice } from './cashbackApi/cashbackApiSlice.ts';
import cashbacksReducer from './cashbacks/cashbackReducer.ts';
import { cardApiSlice } from './cardApi/cardApiSlice.ts';

const store = configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [cashbackApiSlice.reducerPath]: cashbackApiSlice.reducer,
        [cardApiSlice.reducerPath]: cardApiSlice.reducer,
        cashbacks: cashbacksReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApiSlice.middleware,
            cashbackApiSlice.middleware,
            cardApiSlice.middleware,
        ),
});

export default store;
