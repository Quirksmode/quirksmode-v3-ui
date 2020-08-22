import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageContactState, PageContactData } from './PageContact.types';

export const initialState: PageContactState = {
  content: {
    title: '',
  },
  metadata: null,
  loading: false,
  error: false,
};

const pageContact = createSlice({
  name: 'pageContact',
  initialState,
  reducers: {
    fetchContactRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchContactSuccess: (
      state,
      { payload }: PayloadAction<PageContactData>
    ) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchContactError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default pageContact.reducer;
export const {
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
} = pageContact.actions;
