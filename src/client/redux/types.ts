import { useSelector, TypedUseSelectorHook } from 'react-redux';
import createStore from 'client/redux/store';
import { ThunkAction } from 'redux-thunk';
import { Action } from "@reduxjs/toolkit";

const { store } = createStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
