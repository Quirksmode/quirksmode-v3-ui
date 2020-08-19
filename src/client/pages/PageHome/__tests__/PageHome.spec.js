import {
  findByTestAttr,
  mountRender,
  reduxWrap,
  makeMockStore
} from 'tests/testUtils';
import moxios from 'moxios';
import PageHome from './PageHome';
import PageHomeStub from './PageHome.stub.json';
import { fetchHomeData } from './PageHome.actions';
import 'tests/mocks/intersectionObserver';

describe('PageHome', () => {
  let wrapper;
  const props = {
  };

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
    const store = makeMockStore();
    wrapper = mountRender(reduxWrap(PageHome, props));

    store.dispatch(fetchHomeData());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: PageHomeStub
      }).then(() => {
        const expected = [
          {
            type: 'fetch_home_request'
          },
          {
            type: 'fetch_home_success',
            payload: PageHomeStub
          }
        ];
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      });
    });
  });

  it('runs the correct actions when the Home data is not successfully fetched', async (done) => {
    const store = makeMockStore();
    wrapper = mountRender(reduxWrap(PageHome, props));

    store.dispatch(fetchHomeData());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500
      }).then(() => {
        const expected = [
          {
            type: 'fetch_home_request'
          },
          {
            type: 'fetch_home_error'
          }
        ];
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      });
    });
  });
});
