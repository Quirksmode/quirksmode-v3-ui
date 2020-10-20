import { findByTestAttr, mountRender } from 'client/tests/testUtils';
import Page404 from '../Page404';

describe('Page404', () => {
  it('matches snapshot and renders correctly', () => {
    const wrapper = mountRender(Page404);
    expect(findByTestAttr(wrapper, 'Page404').length).toEqual(1);
    expect(findByTestAttr(wrapper, 'Page404__title').text()).toEqual(
      'Error - 404'
    );
    expect(wrapper.html).toMatchSnapshot();
  });
});
