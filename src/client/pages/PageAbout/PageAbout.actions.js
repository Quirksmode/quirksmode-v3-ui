export const FETCH_ABOUT_DATA = 'fetch_about_data';
export const fetchAboutData = () => async (dispatch, getState, api) => {
  const res = await api.get('quirksmode/v1/pages/about-me');

  dispatch({
    type: FETCH_ABOUT_DATA,
    payload: res
  });
};
