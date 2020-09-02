import { combineReducers, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import createRootReducer from 'client/redux/rootReducer';
import { AppState } from 'client/redux/types';
import { createBrowserHistory } from 'history';

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
  return createMockStore<AppState, DispatchExts>(middleware)({
    ...initialState,
    ...customState,
  });
};
