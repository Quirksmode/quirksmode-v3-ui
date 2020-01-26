export const FETCH_BLOG_DATA = 'fetch_blog_data';
export const fetchBlogData = (queryVars = '') => async (dispatch, getState, api) => {
  const res = await api.get(`quirksmode/v1/pages/blog${queryVars}`);

  dispatch({
    type: FETCH_BLOG_DATA,
    payload: res
  });
};
