import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from './mocks/store';

/**
 * Return node(s) with the given data-test attribute.
 */
export const findByTestAttr = (wrapper: any, val: string) =>
  wrapper.find(`[data-test="${val}"]`);

export const mountRender = (
  Component: React.FC,
  defaultProps = {},
  customProps = {}
) => {
  const props = {
    ...defaultProps,
    ...customProps,
  };
  return mount(<Component {...props} />);
};

export const reduxHelper = (Component: React.FC, props = {}, state = {}) => {
  const { store, ProviderWithStore } = mockStore(state);
  const ReduxWrapper = () => (
    <ProviderWithStore>
      <MemoryRouter>
        <Component {...props} />
      </MemoryRouter>
    </ProviderWithStore>
  );
  return { ...store, ReduxWrapper };
};

export const mockSuccess = (data: any) => ({ status: 200, response: { data } });
export const mockError = (error: any) => ({ status: 500, response: error });
