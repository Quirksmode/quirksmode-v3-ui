import axios from 'axios';

export const FETCH_HOME_REQUEST = 'fetch_home_request';
export const FETCH_HOME_SUCCESS = 'fetch_home_success';
export const FETCH_HOME_ERROR = 'fetch_home_error';

export const fetchHomeData = () => async (dispatch) => {
  dispatch({
    type: FETCH_HOME_REQUEST
  });

  try {
    const res = await axios.get('https://cms.quirksmode.co.uk/wp-json/quirksmode/v1/pages/home');
    dispatch({
      type: FETCH_HOME_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_HOME_ERROR
    });
  }
};
