import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageAboutState, PageAboutData } from './PageAbout.types';

export const initialState: PageAboutState = {
  content: {
    title: '',
    intro: '',
    skillsSections: {
      skillsIcon: '',
      skillsTitle: '',
      skills: [],
    },
    cvSections: [],
  },
  metadata: null,
  loading: false,
  error: false,
};

const pageAbout = createSlice({
  name: 'pageAbout',
  initialState,
  reducers: {
    fetchAboutRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchAboutSuccess: (state, { payload }: PayloadAction<PageAboutData>) => {
      state.content = payload.content;
      state.metadata = payload.metadata;
      state.loading = false;
      state.error = false;
    },
    fetchAboutError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default pageAbout.reducer;
export const {
  fetchAboutRequest,
  fetchAboutSuccess,
  fetchAboutError,
} = pageAbout.actions;
