import {
  findByTestAttr,
  mountRender,
  reduxHelper,
} from 'client/tests/testUtils';
import moxios from 'moxios';
import PageAbout from '../PageAbout';
import AppStub from 'client/__tests__/app.stub.json';
import PageAboutStub from './PageAbout.stub.json';
import PageWrapper from 'client/components/PageWrapper/PageWrapper';

describe('PageAbout', () => {
  let wrapper;
  const props = {};
  const state = {
    app: AppStub,
    pageAbout: PageAboutStub,
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('matches snapshot and renders correctly with data', () => {
    const { ReduxWrapper } = reduxHelper(PageAbout, props, state);
    wrapper = mountRender(ReduxWrapper);
    expect(wrapper.find(PageWrapper).length).toEqual(1);
    expect(findByTestAttr(wrapper, 'Breadcrumbs').length).toEqual(1);
    expect(findByTestAttr(wrapper, 'PageAbout__skills').length).toBe(8);
    expect(findByTestAttr(wrapper, 'PageAbout__skillBox').length).toBe(40);
    expect(findByTestAttr(wrapper, 'PageAbout__cvSection').length).toBe(4);
    expect(wrapper.html).toMatchSnapshot();
  });

  it('renders correctly when there is no data', () => {
    const { ReduxWrapper } = reduxHelper(PageAbout, props);
    wrapper = mountRender(ReduxWrapper);
    expect(wrapper.find(PageWrapper).length).toEqual(1);
    expect(wrapper.html).toMatchSnapshot();
  });

  it('runs the fetchAboutData action if the title is not defined', () => {
    const newState = {
      ...state,
      pageAbout: {
        ...state.pageAbout,
        content: {
          ...state.pageAbout.content,
          title: '',
        },
      },
    };
    const { dispatch, ReduxWrapper } = reduxHelper(PageAbout, props, newState);
    wrapper = mountRender(ReduxWrapper);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it("doesn't run the fetchAboutData action if the title is defined", () => {
    const { dispatch, ReduxWrapper } = reduxHelper(PageAbout, props, state);
    wrapper = mountRender(ReduxWrapper);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('runs the correct actions when the About data is successfully fetched', async (done) => {
    const { getActions, ReduxWrapper } = reduxHelper(PageAbout, props);
    wrapper = mountRender(ReduxWrapper);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: PageAboutStub,
        })
        .then(() => {
          const expected = [
            {
              type: 'pageAbout/fetchAboutRequest',
            },
            {
              type: 'pageAbout/fetchAboutSuccess',
              payload: PageAboutStub,
            },
          ];
          const actual = getActions();
          expect(actual).toEqual(expected);
          done();
        });
    });
  });

  it('runs the correct actions when the About data is not successfully fetched', async (done) => {
    const { getActions, ReduxWrapper } = reduxHelper(PageAbout, props);
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
              type: 'pageAbout/fetchAboutRequest',
            },
            {
              type: 'pageAbout/fetchAboutError',
            },
          ];
          const actual = getActions();
          expect(actual).toEqual(expected);
          done();
        });
    });
  });
});
