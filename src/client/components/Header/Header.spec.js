import React from 'react';
import { shallow, mount } from 'enzyme';
import getMockProvider from 'tests/mocks/store';
import { findByTestAttr } from 'tests/testUtils';
import { Header } from './Header';

describe('Header', () => {
  let wrapper;
  let component;

  jest.mock('react-redux', () => ({
    connect: () => jest.fn(),
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn()
  }));

  const setup = (partialState) => {
    const { MockProvider } = getMockProvider(partialState);
    return { MockProvider };
  };

  describe('Render with initial props', () => {
    beforeAll(() => {
      const { MockProvider } = setup();
      wrapper = mount(
        <MockProvider>
          <Header location={ {} } />
        </MockProvider>
      );
      component = wrapper;
    });

    it('logo should not display', () => {
      const logo = findByTestAttr(component, 'logo');
      expect(logo.length).toBe(0);
    });
  });

  describe('Render with fetched props', () => {
    beforeAll(() => {
      const { MockProvider } = setup();
      wrapper = mount(
        <MockProvider>
          <Header location={ {} } />
        </MockProvider>
      );
      component = wrapper;
    });

    it('logo should display', () => {
      const logo = findByTestAttr(component, 'logo');
      expect(logo.length).toBe(1);
    });
  });
});
