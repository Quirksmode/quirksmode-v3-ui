export const FETCH_CONTACT_DATA = 'fetch_contact_data';
export const fetchContactData = () => async (dispatch, getState, api) => {
  const res = await api.get('quirksmode/v1/pages/contact');

  dispatch({
    type: FETCH_CONTACT_DATA,
    payload: res
  });
};
