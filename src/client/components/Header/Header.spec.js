import React from 'react';
import { shallow } from 'enzyme';
import store from 'tests/mocks/store';
import { Header } from './Header';

describe('Header', () => {
  let wrapper;
  let component;

  beforeAll(() => {
    wrapper = shallow((
      <Header />
    ));
    component = wrapper.dive();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a logo', () => {
    expect(component.find('.LogoNav__nav').length).toBe(1);
  });
});
