import {
  SENDING_MAIL, SEND_MAIL_SUCCESS, SEND_MAIL_ERROR, RESET_FORM
} from './PageContactForm.actions';

const initialState = {
  sending: false,
  error: false,
  success: false,
  response: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SENDING_MAIL:
      return {
        ...state,
        sending: true
      };
    case SEND_MAIL_SUCCESS:
      return {
        ...state,
        sending: false,
        success: true
      };
    case SEND_MAIL_ERROR:
      return {
        ...state,
        sending: false,
        error: true
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};
