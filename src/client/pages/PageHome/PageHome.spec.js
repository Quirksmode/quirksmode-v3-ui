import {
  findByTestAttr,
  mountRender,
  reduxWrap
} from 'tests/testUtils';
import PageHome from './PageHome';
import 'tests/mocks/intersectionObserver';

describe('PageHome', () => {
  let wrapper;
  const props = {
  };

  beforeEach(() => {
    wrapper = mountRender(reduxWrap(PageHome, props));
  });

  it('matches snapshot', () => {
    expect(wrapper.html).toMatchSnapshot();
  });
});
