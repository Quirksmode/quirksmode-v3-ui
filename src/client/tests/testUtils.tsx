import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
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

export const reduxHelper = (
  Component: React.FC,
  props = {},
  state = {},
  routeData = {
    initialEntries: ['/'],
    path: '/',
  }
) => {
  const { store, ProviderWithStore } = mockStore(state);
  const { initialEntries, path } = routeData;

  const ReduxWrapper = () => (
    <ProviderWithStore>
      <MemoryRouter initialEntries={initialEntries}>
        <Route path={path}>
          <Component {...props} />
        </Route>
      </MemoryRouter>
    </ProviderWithStore>
  );
  return { ...store, ReduxWrapper };
};

export const mockSuccess = (data: any) => ({ status: 200, response: { data } });
export const mockError = (error: any) => ({ status: 500, response: error });
