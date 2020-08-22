import {
  AppState,
  AppData,
  SetLinkLoadingPayload,
  SetUtilityPayload,
} from './App.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: AppState = {
  siteSettings: {
    cv: null,
    mainLogo: null,
  },
  navItems: [],
  footerNavItems: [],
  projectTags: [],
  projectCategories: [],
  blogTags: [],
  blogCategories: [],
  subfooter: null,
  loadingSlug: '',
  utility: {
    isNavToggled: false,
    isSearchToggled: false,
    isMenuBtnToggled: false,
  },
  loading: false,
  error: false,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchAppRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchAppSuccess: (state, { payload }: PayloadAction<AppData>) => {
      state.siteSettings = payload.siteSettings;
      state.navItems = payload.navItems;
      state.footerNavItems = payload.footerNavItems;
      state.projectTags = payload.projectTags;
      (state.projectCategories = payload.projectCategories),
        (state.blogTags = payload.blogTags);
      state.blogCategories = payload.blogCategories;
      state.subfooter = payload.subfooter;
      state.loading = false;
      state.error = false;
    },
    fetchAppError: (state) => {
      state.loading = false;
      state.error = true;
    },
    setLinkLoading: (
      state,
      { payload }: PayloadAction<SetLinkLoadingPayload>
    ) => {
      state.loadingSlug = payload.loadingSlug;
    },
    setLinkLoaded: (state) => {
      state.loadingSlug = '';
    },
    setUtility: (state, { payload }: PayloadAction<SetUtilityPayload>) => {
      state.utility = payload.utility;
    },
  },
});

export default app.reducer;
export const {
  fetchAppRequest,
  fetchAppSuccess,
  fetchAppError,
  setLinkLoading,
  setLinkLoaded,
  setUtility,
} = app.actions;
