import checkPropTypes from 'check-prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from 'redux/store';
import createRootReducer from 'redux/combineReducers';

/**
 * Create history API
 */
const history = createBrowserHistory();

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  expect(propError).toBeUndefined();
};

export const makeMountRender = (Component, defaultProps = {}) => (customProps = {}) => {
  const props = {
    ...defaultProps,
    ...customProps
  };
  return mount(<Component { ...props } />);
};

export const makeStore = (customState = {}) => {
  const initialState = createRootReducer(history)({}, { type: '@@INIT' });
  const state = {
    ...initialState,
    ...customState
  };
  return configureStore(state, {}, history);
};

export const reduxify = (Component, props = {}, state = {}) => function reduxWrap() {
  return (
    <Provider store={ makeStore(state) }>
      <ConnectedRouter history={ history }>
        <Component { ...props } />
      </ConnectedRouter>
    </Provider>
  );
};

export const snapshotify = reactWrapper => reactWrapper.html();
