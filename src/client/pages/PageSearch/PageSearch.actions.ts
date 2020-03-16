import axios from 'axios';

export const FETCH_SEARCH_REQUEST = 'fetch_search_request';
export const FETCH_SEARCH_SUCCESS = 'fetch_search_success';
export const FETCH_SEARCH_ERROR = 'fetch_search_error';

export const fetchSearchData = query => async (dispatch) => {
  dispatch({
    type: FETCH_SEARCH_REQUEST
  });

  try {
    const res = await axios.get(`https://cms.quirksmode.co.uk/wp-json/quirksmode/v1/pages/search?s=${query}`);
    dispatch({
      type: FETCH_SEARCH_SUCCESS,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: FETCH_SEARCH_ERROR
    });
  }
};
