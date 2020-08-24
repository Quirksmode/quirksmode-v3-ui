import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageBlogState, PageBlogData } from './PageBlog.types';

export const initialState: PageBlogState = {
  content: {
    title: '',
    blogPosts: [],
  },
  metadata: null,
  loading: false,
  error: false,
};

const pageBlog = createSlice({
  name: 'pageBlog',
  initialState,
  reducers: {
    fetchBlogRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchBlogSuccess: (state, { payload }: PayloadAction<PageBlogData>) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchBlogError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default pageBlog.reducer;
export const {
  fetchBlogRequest,
  fetchBlogSuccess,
  fetchBlogError,
} = pageBlog.actions;
