import { mountRender, reduxHelper } from 'client/tests/testUtils';
import moxios from 'moxios';
import PageHome from '../PageHome';
import AppStub from 'client/__tests__/app.stub.json';
import PageHomeStub from './PageHome.stub.json';
import 'tests/mocks/intersectionObserver';
import PageHomeBlog from '../PageHomeBlog/PageHomeBlog';
import PageWrapper from 'client/components/PageWrapper/PageWrapper';
import PageHomeFeatured from '../PageHomeFeatured/PageHomeFeatured';
import PageHomeIntro from '../PageHomeIntro/PageHomeIntro';
import PageHomeSkills from '../PageHomeSkills/PageHomeSkills';

describe('PageHome', () => {
  let wrapper;
  const props = {};
  const state = {
    app: AppStub,
    pageHome: PageHomeStub,
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('matches snapshot and renders correctly with data', () => {
    const { ReduxWrapper } = reduxHelper(PageHome, props, state);
    wrapper = mountRender(ReduxWrapper);
    expect(wrapper.find(PageWrapper).length).toEqual(1);
    expect(wrapper.find(PageHomeFeatured).length).toEqual(1);
    expect(wrapper.find(PageHomeIntro).length).toEqual(1);
    expect(wrapper.find(PageHomeSkills).length).toEqual(1);
    expect(wrapper.find(PageHomeBlog).length).toEqual(1);
    expect(wrapper.html).toMatchSnapshot();
  });

  it('renders correctly when there is no data', () => {
    const { ReduxWrapper } = reduxHelper(PageHome, props);
    wrapper = mountRender(ReduxWrapper);
    expect(wrapper.find(PageWrapper).length).toEqual(1);
    expect(wrapper.find(PageHomeFeatured).length).toEqual(0);
    expect(wrapper.find(PageHomeIntro).length).toEqual(0);
    expect(wrapper.find(PageHomeSkills).length).toEqual(0);
    expect(wrapper.find(PageHomeBlog).length).toEqual(0);
    expect(wrapper.html).toMatchSnapshot();
  });

  it('runs the fetchHomeData action if intro is not defined', () => {
    const newState = {
      ...state,
      pageHome: {
        ...state.pageHome,
        content: {
          ...state.pageHome.content,
          intro: null as any,
        },
      },
    };
    const { dispatch, ReduxWrapper } = reduxHelper(PageHome, props, newState);
    wrapper = mountRender(ReduxWrapper);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it("doesn't run the fetchHomeData action if the intro is defined", () => {
    const { dispatch, ReduxWrapper } = reduxHelper(PageHome, props, state);
    wrapper = mountRender(ReduxWrapper);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('runs the correct actions when the Home data is successfully fetched', async (done) => {
    const { getActions, ReduxWrapper } = reduxHelper(PageHome, props);
    wrapper = mountRender(ReduxWrapper);

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
    const { getActions, ReduxWrapper } = reduxHelper(PageHome, props);
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
