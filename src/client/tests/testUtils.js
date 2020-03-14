import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import createRootReducer from 'redux/combineReducers';

/**
 * Return node(s) with the given data-test attribute.
 *
 * @name findByTestAttr
 * @param {Wrapper} wrapper - Enzyme wrapper.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {Wrapper}
 */
export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

export const mountRender = (Component, defaultProps = {}, customProps = {}) => {
  const props = {
    ...defaultProps,
    ...customProps
  };
  return mount(<Component { ...props } />);
};

// Create history API
const history = createBrowserHistory();

// Setup middlewares for history tracking and thunks
const middleware = [thunk];
if (history) {
  middleware.push(routerMiddleware(history));
}
const mockStore = configureMockStore(middleware);


/**
 * Create Redux store using actual reducers
 *
 * @name store
 * @param {object} customState - Custom State for Store
 * @returns {Store} - Redux Store.
 */
export const makeMockStore = (customState = {}) => {
  const initialState = createRootReducer(history)({}, { type: '@@INIT' });
  return mockStore({
    ...initialState,
    ...customState
  });
};

export const reduxWrap = (Component, props = {}, state = {}) => () => (
  <Provider store={ makeMockStore(state) }>
    <ConnectedRouter history={ history }>
      <Component { ...props } />
    </ConnectedRouter>
  </Provider>
);

export const mockSuccess = data => ({ status: 200, response: { data } });
export const mockError = error => ({ status: 500, response: error });
