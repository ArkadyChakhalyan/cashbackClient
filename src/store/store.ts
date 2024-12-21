import { configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from './userApi/userApiSlice.ts';
import { cashbackApiSlice } from './cashbackApi/cashbackApiSlice.ts';
import cashbacksReducer from './cashbacks/cashbackReducer.ts';

const store = configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [cashbackApiSlice.reducerPath]: cashbackApiSlice.reducer,
        cashbacks: cashbacksReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApiSlice.middleware,
            cashbackApiSlice.middleware
        ),
});

export default store;
