import { AppState, Action, AppActionTypes } from './App.types';

export const initialState: AppState = {
  siteSettings: {
    cv: {},
    mainLogo: {
      sizes: {},
    },
  },
  navItems: [],
  footerNavItems: [],
  projectTags: [],
  projectCategories: [],
  blogTags: [],
  blogCategories: [],
  subfooter: {
    about: {},
    latestTweets: {},
    instagram: {},
    contact: {},
  },
  loadingSlug: '',
  utility: {
    isNavToggled: false,
    isSearchToggled: false,
    isMenuBtnToggled: false,
  },
  loading: false,
  error: false,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case AppActionTypes.FETCH_APP_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case AppActionTypes.FETCH_APP_SUCCESS:
      console.log('FETCH_APP_SUCCESS action.payload', action.payload);
      return {
        ...state,
        siteSettings: action.payload.siteSettings,
        navItems: action.payload.navItems,
        footerNavItems: action.payload.footerNavItems,
        projectTags: action.payload.projectTags,
        projectCategories: action.payload.projectCategories,
        blogTags: action.payload.blogTags,
        blogCategories: action.payload.blogCategories,
        subfooter: action.payload.subfooter,
        loading: false,
        error: false,
      };
    case AppActionTypes.FETCH_APP_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case AppActionTypes.SET_LINK_LOADING:
      return {
        ...state,
        loadingSlug: action.payload,
      };
    case AppActionTypes.SET_LINK_LOADED:
      return {
        ...state,
        loadingSlug: '',
      };
    case AppActionTypes.SET_UTILITY:
      return {
        ...state,
        utility: action.payload,
      };
    default:
      return state;
  }
};
