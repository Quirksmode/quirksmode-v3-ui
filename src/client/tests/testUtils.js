import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from 'redux/store';
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

/**
 * Create Redux store using actual reducers
 *
 * @name store
 * @param {object} customState - Custom State for Store
 * @returns {Store} - Redux Store.
 */
export const store = (customState = {}) => {
  const initialState = createRootReducer(history)({}, { type: '@@INIT' });
  const state = {
    ...initialState,
    ...customState
  };
  return configureStore(state, {}, history);
};

export const reduxWrap = (Component, props = {}, state = {}) => () => (
  <Provider store={ store(state) }>
    <ConnectedRouter history={ history }>
      <Component { ...props } />
    </ConnectedRouter>
  </Provider>
);
