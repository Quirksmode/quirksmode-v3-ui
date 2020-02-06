export const FETCH_CONTACT_REQUEST = 'fetch_contact_request';
export const FETCH_CONTACT_SUCCESS = 'fetch_contact_success';
export const FETCH_CONTACT_ERROR = 'fetch_contact_error';

export const fetchContactData = () => async (dispatch, getState, api) => {
  // Set the loading state
  dispatch({
    type: FETCH_CONTACT_REQUEST
  });

  try {
    const res = await api.get('quirksmode/v1/pages/contact');
    dispatch({
      type: FETCH_CONTACT_SUCCESS,
      payload: res
    });
  } catch {
    dispatch({
      type: FETCH_CONTACT_ERROR
    });
  }
};
