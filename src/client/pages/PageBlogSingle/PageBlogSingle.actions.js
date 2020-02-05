import { push } from 'connected-react-router';
import { setLinkLoading, setLinkLoaded } from '../../App.actions';

export const FETCH_BLOG_SINGLE_REQUEST = 'fetch_blog_single_request';
export const FETCH_BLOG_SINGLE_SUCCESS = 'fetch_blog_single_success';
export const FETCH_BLOG_SINGLE_ERROR = 'fetch_blog_single_error';
export const fetchBlogSingleData = (slug, href = null) => async (
  dispatch,
  getState,
  api
) => {
  // Set the loading state
  dispatch({
    type: FETCH_BLOG_SINGLE_REQUEST,
    payload: slug
  });

  // If href, dispatch custom Link Loader Functionality
  if (href) {
    dispatch(setLinkLoading(href));
  }

  const res = await api.get(`quirksmode/v1/pages/blog/${slug}`);

  dispatch({
    type: FETCH_BLOG_SINGLE_SUCCESS,
    payload: res
  });

  // If href, navigate to it
  if (href) {
    dispatch(setLinkLoaded());
    dispatch(push(href));
  }
};
