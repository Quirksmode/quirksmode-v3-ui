export const FETCH_APP_DATA = 'fetch_app_data';
export const fetchAppData = () => async (dispatch, getState, api) => {
  const res = await api.get('quirksmode/v1/app');

  dispatch({
    type: FETCH_APP_DATA,
    payload: res
  });
};
