export const FETCH_SEARCH_DATA = 'fetch_search_data';
export const fetchSearchData = query => async (dispatch, getState, api) => {
  const res = await api.get(`quirksmode/v1/pages/search?s=${query}`);

  dispatch({
    type: FETCH_SEARCH_DATA,
    payload: res
  });
};
