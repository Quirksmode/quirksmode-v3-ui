export const FETCH_BLOG_SINGLE = 'fetch_blog_single';
export const fetchBlogSingleData = slug => async (
  dispatch,
  getState,
  api
) => {
  const res = await api.get(`quirksmode/v1/pages/blog/${slug}`);

  dispatch({
    type: FETCH_BLOG_SINGLE,
    payload: res
  });
};
