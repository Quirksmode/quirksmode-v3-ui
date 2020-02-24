import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { initialState } from 'client/redux/combineReducers';

export default (state) => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    ...initialState,
    ...state
  });

  return {
    MockProvider: ({ children }) => (
      <Provider store={ store }>{children}</Provider>
    ),
    store
  };
};
