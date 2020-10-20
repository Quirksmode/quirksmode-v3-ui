import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageState, PageData } from './Page.types';

export const initialState: PageState = {
  content: {
    title: '',
    slug: '',
    pageContent: '',
    contentBlocks: [],
  },
  metadata: null,
  loading: false,
  error: false,
};

const page = createSlice({
  name: 'page',
  initialState,
  reducers: {
    fetchPageRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchPageSuccess: (state, { payload }: PayloadAction<PageData>) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchPageError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default page.reducer;
export const {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageError,
} = page.actions;
