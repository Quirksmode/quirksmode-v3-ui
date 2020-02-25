import {
  findByTestAttr,
  makeMountRender,
  reduxify,
  snapshotify
} from 'tests/testUtils';
import appStub from 'client/App.stub.json';
import pageHomeStub from 'pages/PageHome/PageHome.stub.json';
import { Header } from './Header';
import 'tests/mocks/intersectionObserver';

const props = {
  location: {
    pathname: '/'
  }
};

describe('Header', () => {
  it('matches snapshot', () => {
    const wrapper = makeMountRender(reduxify(Header, props))();
    expect(snapshotify(wrapper)).toMatchSnapshot();
  });

  describe('Render with initial props', () => {
    it('logo should not display', () => {
      const wrapper = makeMountRender(reduxify(Header, props))();
      const logo = findByTestAttr(wrapper, 'logo');
      expect(logo.length).toBe(0);
    });
  });

  describe('Render with fetched props', () => {
    it('logo should display', () => {
      const wrapper = makeMountRender(reduxify(Header, props, {
        app: appStub,
        pageHome: pageHomeStub
      }))();
      const logo = findByTestAttr(wrapper, 'logo');
      expect(logo.length).toBe(1);
    });
  });
});
