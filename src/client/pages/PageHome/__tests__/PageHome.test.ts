import { mockStore } from 'client/tests/mocks/store';
import { mountRender, reduxWrap } from 'client/tests/testUtils';
import moxios from 'moxios';
import PageHome from '../PageHome';
import PageHomeStub from './PageHome.stub.json';
import { fetchHomeData } from '../PageHome.actions';
import 'tests/mocks/intersectionObserver';

describe('PageHome', () => {
  let wrapper;
  const props = {};

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('matches snapshot', () => {
    wrapper = mountRender(reduxWrap(PageHome, props));
    expect(wrapper.html).toMatchSnapshot();
  });

  it('runs the correct actions when the Home data is successfully fetched', async (done) => {
    const { dispatch, getActions } = mockStore();
    wrapper = mountRender(reduxWrap(PageHome, props));

    dispatch(fetchHomeData());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: PageHomeStub,
        })
        .then(() => {
          const expected = [
            {
              type: 'pageHome/fetchHomeRequest',
            },
            {
              type: 'pageHome/fetchHomeSuccess',
              payload: PageHomeStub,
            },
          ];
          const actual = getActions();
          expect(actual).toEqual(expected);
          done();
        });
    });
  });

  it('runs the correct actions when the Home data is not successfully fetched', async (done) => {
    const { dispatch, getActions } = mockStore();
    wrapper = mountRender(reduxWrap(PageHome, props));

    dispatch(fetchHomeData());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 500,
        })
        .then(() => {
          const expected = [
            {
              type: 'pageHome/fetchHomeRequest',
            },
            {
              type: 'pageHome/fetchHomeError',
            },
          ];
          const actual = getActions();
          expect(actual).toEqual(expected);
          done();
        });
    });
  });
});
