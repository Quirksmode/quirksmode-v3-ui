export const FETCH_HOME_DATA = 'fetch_home_data';
export const fetchHomeData = () => async (dispatch, getState, api) => {
  const res = await api.get('quirksmode/v1/pages/home');

  dispatch({
    type: FETCH_HOME_DATA,
    payload: res
  });
};
