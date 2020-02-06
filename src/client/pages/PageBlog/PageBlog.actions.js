export const FETCH_BLOG_REQUEST = 'fetch_blog_request';
export const FETCH_BLOG_SUCCESS = 'fetch_blog_success';
export const FETCH_BLOG_ERROR = 'fetch_blog_error';
export const fetchBlogData = (queryVars = '') => async (dispatch, getState, api) => {
  dispatch({
    type: FETCH_BLOG_REQUEST
  });

  try {
    const res = await api.get(`quirksmode/v1/pages/blog${queryVars}`);
    dispatch({
      type: FETCH_BLOG_SUCCESS,
      payload: res
    });
  } catch {
    dispatch({
      type: FETCH_BLOG_ERROR
    });
  }
};
