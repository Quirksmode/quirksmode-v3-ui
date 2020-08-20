import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PagePortfolioState, PagePortfolioData } from './PagePortfolio.types';

export const initialState: PagePortfolioState = {
  content: {
    title: '',
    projects: [],
  },
  metadata: null,
  loading: false,
  error: false,
};

const pagePortfolio = createSlice({
  name: 'pagePortfolio',
  initialState,
  reducers: {
    fetchPortfolioRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchPortfolioSuccess: (
      state,
      { payload }: PayloadAction<PagePortfolioData>
    ) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchPortfolioError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default pagePortfolio.reducer;
export const {
  fetchPortfolioRequest,
  fetchPortfolioSuccess,
  fetchPortfolioError,
} = pagePortfolio.actions;
