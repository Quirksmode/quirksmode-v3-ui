import {
  PageHomeState,
  Action,
  ActionTypes
} from './PageHome.types';

export const initialState: PageHomeState = {
  content: {
    title: '',
    heroSlides: [],
    featuredWork: [],
    intro: null,
    latestBlogPosts: [],
    skills: [],
  },
  metadata: {},
  loading: false,
  error: false
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_HOME_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case ActionTypes.FETCH_HOME_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        metadata: action.payload.metadata,
        loading: false,
        error: false
      };
    case ActionTypes.FETCH_HOME_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
