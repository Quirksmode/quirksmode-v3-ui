import {
  findByTestAttr,
  mountRender,
  reduxHelper,
} from 'client/tests/testUtils';
import moxios from 'moxios';
import Page from '../Page';
import AppStub from 'client/__tests__/app.stub.json';
import PageStub from './Page.stub.json';
import PageWrapper from 'client/components/PageWrapper/PageWrapper';

describe('Page', () => {
  let wrapper;
  const props = {};
  const state = {
    app: AppStub,
    page: PageStub,
  };
  const routeData = {
    initialEntries: ['/accessibility'],
    path: '/:slug',
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('matches snapshot and renders correctly with data', () => {
    const { ReduxWrapper } = reduxHelper(Page, props, state, routeData);
    wrapper = mountRender(ReduxWrapper);
    expect(wrapper.find(PageWrapper).length).toEqual(1);
    expect(findByTestAttr(wrapper, 'Breadcrumbs').length).toEqual(1);
    expect(wrapper.html).toMatchSnapshot();
  });

  it('renders correctly when there is no data', () => {
    const { ReduxWrapper } = reduxHelper(Page, props, {}, routeData);
    wrapper = mountRender(ReduxWrapper);
    expect(wrapper.find(PageWrapper).length).toEqual(1);
    expect(wrapper.html).toMatchSnapshot();
  });

  it('runs the fetchPageData action on page load', () => {
    const newState = {
      ...state,
      page: {
        ...state.page,
        content: {
          ...state.page.content,
          title: '',
        },
      },
    };
    const { dispatch, ReduxWrapper } = reduxHelper(
      Page,
      props,
      newState,
      routeData
    );
    wrapper = mountRender(ReduxWrapper);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('runs the correct actions when the Page data is successfully fetched', async (done) => {
    const { getActions, ReduxWrapper } = reduxHelper(
      Page,
      props,
      {},
      routeData
    );
    wrapper = mountRender(ReduxWrapper);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: PageStub,
        })
        .then(() => {
          const expected = [
            {
              type: 'page/fetchPageRequest',
            },
            {
              type: 'page/fetchPageSuccess',
              payload: PageStub,
            },
          ];
          const actual = getActions();
          expect(actual).toEqual(expected);
          done();
        });
    });
  });

  it('runs the correct actions when the Page data is not successfully fetched', async (done) => {
    const { getActions, ReduxWrapper } = reduxHelper(
      Page,
      props,
      {},
      routeData
    );
    wrapper = mountRender(ReduxWrapper);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 500,
        })
        .then(() => {
          const expected = [
            {
              type: 'page/fetchPageRequest',
            },
            {
              type: 'page/fetchPageError',
            },
          ];
          const actual = getActions();
          expect(actual).toEqual(expected);
          done();
        });
    });
  });
});
