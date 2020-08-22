import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageContactFormState } from './PageContactForm.types';

export const initialState: PageContactFormState = {
  formSending: false,
  formError: false,
  formSuccess: false,
  formResponse: null,
};

const pageContactForm = createSlice({
  name: 'pageContact',
  initialState,
  reducers: {
    sendMailRequest: (state) => {
      state.formSending = true;
    },
    sendMailSuccess: (state) => {
      state.formSending = false;
      state.formSuccess = true;
    },
    sendMailError: (state) => {
      state.formSending = false;
      state.formError = true;
    },
    resetTheForm: (state) => {
      state = initialState;
    },
  },
});

export default pageContactForm.reducer;
export const {
  sendMailRequest,
  sendMailSuccess,
  sendMailError,
  resetTheForm,
} = pageContactForm.actions;
