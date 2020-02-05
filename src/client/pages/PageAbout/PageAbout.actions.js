export const FETCH_ABOUT_REQUEST = 'fetch_about_request';
export const FETCH_ABOUT_SUCCESS = 'fetch_about_success';
export const FETCH_ABOUT_ERROR = 'fetch_about_error';
export const fetchAboutData = () => async (dispatch, getState, api) => {
  dispatch({
    type: FETCH_ABOUT_REQUEST
  });

  try {
    const res = await api.get('quirksmode/v1/pages/about-me');
    dispatch({
      type: FETCH_ABOUT_SUCCESS,
      payload: res
    });
  } catch {
    dispatch({
      type: FETCH_ABOUT_ERROR
    });
  }
};
