import { FETCH_APP_DATA } from './App.actions';

const initialState = {
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
    default:
      return state;
  }
};
