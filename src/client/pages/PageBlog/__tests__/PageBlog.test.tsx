import { mountRender, reduxHelper } from 'client/tests/testUtils';
import moxios from 'moxios';
import PageBlog from '../PageBlog';
import AppStub from 'client/__tests__/app.stub.json';
import PageBlogStub from './PageBlog.stub.json';
import 'tests/mocks/intersectionObserver';
import PageWrapper from 'client/components/PageWrapper/PageWrapper';

describe('PageBlog', () => {
  let wrapper;
  const props = {};
  const state = {
    app: AppStub,
    pageBlog: PageBlogStub,
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('matches snapshot and renders correctly with data', () => {
    const { ReduxWrapper } = reduxHelper(PageBlog, props, state);
    wrapper = mountRender(ReduxWrapper);
    expect(wrapper.find(PageWrapper).length).toEqual(1);
    expect(wrapper.html).toMatchSnapshot();
  });

  it('renders correctly when there is no data', () => {
    const { ReduxWrapper } = reduxHelper(PageBlog, props);
    wrapper = mountRender(ReduxWrapper);
    expect(wrapper.find(PageWrapper).length).toEqual(1);
    expect(wrapper.find(PageBlogFeatured).length).toEqual(0);
    expect(wrapper.find(PageBlogIntro).length).toEqual(0);
    expect(wrapper.find(PageBlogSkills).length).toEqual(0);
    expect(wrapper.find(PageBlogBlog).length).toEqual(0);
    expect(wrapper.html).toMatchSnapshot();
  });

  it('runs the fetchHomeData action if intro is not defined', () => {
    const newState = {
      ...state,
      pageBlog: {
        ...state.pageBlog,
        content: {
          ...state.pageBlog.content,
          intro: null as any,
        },
      },
    };
    const { dispatch, ReduxWrapper } = reduxHelper(PageBlog, props, newState);
    wrapper = mountRender(ReduxWrapper);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it("doesn't run the fetchHomeData action if the intro is defined", () => {
    const { dispatch, ReduxWrapper } = reduxHelper(PageBlog, props, state);
    wrapper = mountRender(ReduxWrapper);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('runs the correct actions when the Home data is successfully fetched', async (done) => {
    const { getActions, ReduxWrapper } = reduxHelper(PageBlog, props);
    wrapper = mountRender(ReduxWrapper);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: PageBlogStub,
        })
        .then(() => {
          const expected = [
            {
              type: 'pageBlog/fetchHomeRequest',
            },
            {
              type: 'pageBlog/fetchHomeSuccess',
              payload: PageBlogStub,
            },
          ];
          const actual = getActions();
          expect(actual).toEqual(expected);
          done();
        });
    });
  });

  it('runs the correct actions when the Home data is not successfully fetched', async (done) => {
    const { getActions, ReduxWrapper } = reduxHelper(PageBlog, props);
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
              type: 'pageBlog/fetchHomeRequest',
            },
            {
              type: 'pageBlog/fetchHomeError',
            },
          ];
          const actual = getActions();
          expect(actual).toEqual(expected);
          done();
        });
    });
  });
});
