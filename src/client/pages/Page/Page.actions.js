import { push } from 'connected-react-router';
import { setLinkLoading, setLinkLoaded } from '../../App.actions';

export const FETCH_PAGE_REQUEST = 'fetch_page_request';
export const FETCH_PAGE_SUCCESS = 'fetch_page_success';
export const FETCH_PAGE_ERROR = 'fetch_page_error';
export const fetchPageData = (slug, href = null) => async (
  dispatch,
  getState,
  api
) => {
  // Set the loading state
  dispatch({
    type: FETCH_PAGE_REQUEST
  });

  // If href, dispatch custom Link Loader Functionality
  if (href) {
    dispatch(setLinkLoading(href));
  }

  try {
    const res = await api.get(`quirksmode/v1/pages/${slug}`);

    dispatch({
      type: FETCH_PAGE_SUCCESS,
      payload: res
    });

    // If href, navigate to it
    if (href) {
      dispatch(setLinkLoaded());
      dispatch(push(href));
    }
  } catch {
    dispatch({
      type: FETCH_PAGE_ERROR
    });
  }
};
