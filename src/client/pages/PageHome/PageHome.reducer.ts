import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageHomeState, PageHomeData } from './PageHome.types';

export const initialState: PageHomeState = {
  content: {
    title: '',
    heroSlides: [],
    featuredWork: [],
    intro: null,
    latestBlogPosts: [],
    skills: [],
  },
  metadata: null,
  loading: false,
  error: false,
};

const pageHome = createSlice({
  name: 'pageHome',
  initialState,
  reducers: {
    fetchHomeRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchHomeSuccess: (state, { payload }: PayloadAction<PageHomeData>) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchHomeError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default pageHome.reducer;
export const {
  fetchHomeRequest,
  fetchHomeSuccess,
  fetchHomeError,
} = pageHome.actions;
