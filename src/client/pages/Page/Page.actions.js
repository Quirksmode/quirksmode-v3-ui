export const FETCH_PAGE_DATA = 'fetch_page_data';
export const fetchPageData = slug => async (
  dispatch,
  getState,
  api
) => {
  const res = await api.get(`quirksmode/v1/pages/${slug}`);

  dispatch({
    type: FETCH_PAGE_DATA,
    payload: res
  });
};
