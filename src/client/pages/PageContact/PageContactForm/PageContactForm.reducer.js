import {
  SEND_MAIL_REQUEST, SEND_MAIL_SUCCESS, SEND_MAIL_ERROR, RESET_FORM
} from './PageContactForm.actions';

const initialState = {
  formSending: false,
  formError: false,
  formSuccess: false,
  formResponse: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_MAIL_REQUEST:
      return {
        ...state,
        formSending: true
      };
    case SEND_MAIL_SUCCESS:
      return {
        ...state,
        formSending: false,
        formSuccess: true
      };
    case SEND_MAIL_ERROR:
      return {
        ...state,
        formSending: false,
        formError: true
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};
