import { findByTestAttr, mountRender, reduxWrap } from 'client/tests/testUtils';
import appStub from 'client/__tests__/App.stub.json';
import pageHomeStub from 'pages/PageHome/__tests__/PageHome.stub.json';
import Header from '../Header';
import 'tests/mocks/intersectionObserver';

describe('Header', () => {
  let props = {
    location: {
      pathname: '/',
    },
  };

  it('matches snapshot', () => {
    const wrapper = mountRender(reduxWrap(Header, props));
    expect(wrapper.html).toMatchSnapshot();
  });

  describe('Render with initial props', () => {
    it('logo should not display', () => {
      const wrapper = mountRender(reduxWrap(Header, props));
      const logo = findByTestAttr(wrapper, 'logo');
      expect(logo.length).toBe(0);
    });

    it('hero slider should not display', () => {
      const wrapper = mountRender(reduxWrap(Header, props));
      const headerSlider = findByTestAttr(wrapper, 'Header__slider');
      expect(headerSlider.length).toBe(0);
    });
  });

  describe('Render with fetched props', () => {
    const state = {
      app: appStub,
      pageHome: pageHomeStub,
    };

    it('logo should display', () => {
      const wrapper = mountRender(reduxWrap(Header, props, state));
      const logo = findByTestAttr(wrapper, 'logo');
      expect(logo.length).toBe(1);
    });

    it('hero slider should display', () => {
      const wrapper = mountRender(reduxWrap(Header, props, state));
      const headerSlider = findByTestAttr(wrapper, 'Header__slider');
      expect(headerSlider.length).toBe(1);
    });

    // it('hero slider should not display', () => {
    //   const wrapper = mountRender(reduxWrap(Header, props, state));
    //   const headerSlider = findByTestAttr(wrapper, 'Header__slider');
    //   expect(headerSlider.length).toBe(0);
    // });
  });
});
