import {
  FETCH_APP_DATA, SET_LINK_LOADING, SET_LINK_LOADED, SET_UTILITY
} from './App.actions';

export const initialState = {
  siteSettings: {
    cv: {},
    defaultImage: {},
    mainLogo: {
      sizes: {}
    }
  },
  navItems: [],
  footerNavItems: [],
  projectTags: [],
  projectCategories: [],
  blogTags: [],
  blogCategories: [],
  subfooter: {
    about: {
      link: ''
    },
    latestTweets: {
      tweets: [],
      link: ''
    },
    instagram: {
      link: ''
    },
    contact: {
      link: ''
    }
  },
  loadingSlug: '',
  utility: {
    isNavToggled: false,
    isSearchToggled: false,
    isMenuBtnToggled: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APP_DATA:
      return {
        ...state,
        siteSettings: action.payload.data.siteSettings,
        navItems: action.payload.data.navItems,
        footerNavItems: action.payload.data.footerNavItems,
        projectTags: action.payload.data.projectTags,
        projectCategories: action.payload.data.projectCategories,
        blogTags: action.payload.data.blogTags,
        blogCategories: action.payload.data.blogCategories,
        subfooter: action.payload.data.subfooter
      };
    case SET_LINK_LOADING:
      return {
        ...state,
        loadingSlug: action.payload
      };
    case SET_LINK_LOADED:
      return {
        ...state,
        loadingSlug: ''
      };
    case SET_UTILITY:
      return {
        ...state,
        utility: action.payload
      };
    default:
      return state;
  }
};
