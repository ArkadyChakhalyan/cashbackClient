import store from './store';
import { ICashbacksState } from './cashbacks/types.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IState extends RootState {
    cashbacks: ICashbacksState;
}

export enum EFetchMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
