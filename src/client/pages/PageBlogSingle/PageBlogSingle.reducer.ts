import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PageBlogSingleState,
  PageBlogSingleData,
} from './PageBlogSingle.types';

export const initialState: PageBlogSingleState = {
  content: {
    id: null,
    title: '',
    url: '',
    date: '',
    hero: null,
    contentBlocks: [],
    related: [],
    noRelated: false,
  },
  metadata: null,
  loading: false,
  error: false,
};

const pageBlogSingle = createSlice({
  name: 'pageBlogSingle',
  initialState,
  reducers: {
    fetchBlogSingleRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchBlogSingleSuccess: (
      state,
      { payload }: PayloadAction<PageBlogSingleData>
    ) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchBlogSingleError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default pageBlogSingle.reducer;
export const {
  fetchBlogSingleRequest,
  fetchBlogSingleSuccess,
  fetchBlogSingleError,
} = pageBlogSingle.actions;
