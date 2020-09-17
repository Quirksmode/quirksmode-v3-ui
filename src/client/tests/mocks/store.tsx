import { combineReducers, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import createRootReducer from 'client/redux/rootReducer';
import { AppState } from 'client/redux/types';
import { createBrowserHistory } from 'history';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

// Setup middlewares for history tracking and thunks
type DispatchExts = ThunkDispatch<AppState, void, AnyAction>;
const middleware = [thunk];

/**
 * Create Redux store using actual reducers
 */
export const mockStore = (customState = {}) => {
  const initialState = combineReducers(
    createRootReducer(createBrowserHistory())
  )({} as AppState, {
    type: '@@INIT',
  });
  const store: any = createMockStore<AppState, DispatchExts>(middleware)({
    ...initialState,
    ...customState,
  });

  const originalDispatch = store.dispatch;
  store.dispatch = jest.fn(originalDispatch);

  const ProviderWithStore = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ProviderWithStore };
};
