import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageSearchState, PageSearchData } from './PageSearch.types';

export const initialState: PageSearchState = {
  content: {
    title: '',
    searchPosts: [],
  },
  metadata: null,
  loading: false,
  error: false,
};

const pageSearch = createSlice({
  name: 'pageSearch',
  initialState,
  reducers: {
    fetchSearchRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchSearchSuccess: (state, { payload }: PayloadAction<PageSearchData>) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchSearchError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default pageSearch.reducer;
export const {
  fetchSearchRequest,
  fetchSearchSuccess,
  fetchSearchError,
} = pageSearch.actions;
