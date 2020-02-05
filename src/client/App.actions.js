export const FETCH_APP_DATA = 'fetch_app_data';
export const SET_LINK_LOADING = 'set_link_loading';
export const SET_LINK_LOADED = 'set_link_loaded';

export const fetchAppData = () => async (dispatch, getState, api) => {
  const res = await api.get('quirksmode/v1/app');

  dispatch({
    type: FETCH_APP_DATA,
    payload: res
  });
};

export const setLinkLoading = href => (dispatch) => {
  dispatch({
    type: SET_LINK_LOADING,
    payload: href
  });
};

export const setLinkLoaded = () => (dispatch) => {
  dispatch({
    type: SET_LINK_LOADED
  });
};
