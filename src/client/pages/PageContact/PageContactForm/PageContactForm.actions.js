export const RESET_FORM = 'reset_form';
export const SEND_MAIL_REQUEST = 'send_mail_request';
export const SEND_MAIL_SUCCESS = 'send_mail_success';
export const SEND_MAIL_ERROR = 'send_mail_error';

export const sendMail = data => async (dispatch, getState, api) => {
  // Begin the sending state
  dispatch({ type: SEND_MAIL_REQUEST });

  try {
    // Call the endpoint to send the mail
    const res = await api.post('quirksmode/v1/sendmail', data);

    // Check if successful
    const type = (res.status === 200) ? SEND_MAIL_SUCCESS : SEND_MAIL_ERROR;
    dispatch({ type });
  } catch {
    dispatch({
      type: SEND_MAIL_ERROR
    });
  }
};

export const resetForm = () => (dispatch) => {
  dispatch({ type: RESET_FORM });
};
