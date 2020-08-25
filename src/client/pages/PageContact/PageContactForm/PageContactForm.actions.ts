import axios from 'axios';
import {
  sendMailRequest,
  sendMailSuccess,
  sendMailError,
  resetTheForm,
} from './PageContactForm.reducer';
import { AppThunk, AppDispatch } from 'client/redux/types';
import { PageContactFormSendMailData } from './PageContactForm.types';

export const sendMail = (data: PageContactFormSendMailData): AppThunk => async (
  dispatch
) => {
  // Begin the sending state
  dispatch(sendMailRequest());

  try {
    // Call the endpoint to send the mail
    const res = await axios.post<PageContactFormSendMailData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/sendmail`,
      data
    );

    // Check if successful
    dispatch(res.status === 200 ? sendMailSuccess() : sendMailError());
  } catch {
    dispatch(sendMailError());
  }
};

export const resetForm = () => (dispatch: AppDispatch) => {
  dispatch(resetTheForm());
};
