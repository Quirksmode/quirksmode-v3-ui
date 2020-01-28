import { push } from 'connected-react-router';

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
    type: FETCH_PAGE_REQUEST,
    payload: slug
  });

  const res = await api.get(`quirksmode/v1/pages/${slug}`);

  dispatch({
    type: FETCH_PAGE_SUCCESS,
    payload: res
  });

  // If a href is passed, navigate to it
  if (href) {
    dispatch(push(href));
  }
};
