import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PagePortfolioSingleState,
  PagePortfolioSingleData,
} from './PagePortfolioSingle.types';

export const initialState: PagePortfolioSingleState = {
  content: {
    id: null,
    title: '',
    slug: '',
    url: '',
    hero: null,
    projectTags: [],
    projectRole: '',
    screenshots: [],
    projectURL: '',
    contentBlocks: [],
    related: [],
    noRelated: false,
  },
  loading: false,
  error: false,
  metadata: null,
};

const pagePortfolioSingle = createSlice({
  name: 'pagePortfolioSingle',
  initialState,
  reducers: {
    fetchPortfolioSingleRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchPortfolioSingleSuccess: (
      state,
      { payload }: PayloadAction<PagePortfolioSingleData>
    ) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchPortfolioSingleError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default pagePortfolioSingle.reducer;
export const {
  fetchPortfolioSingleRequest,
  fetchPortfolioSingleSuccess,
  fetchPortfolioSingleError,
} = pagePortfolioSingle.actions;
