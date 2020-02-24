import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_ERROR
} from './PageHome.actions';

export const initialState = {
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

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_HOME_SUCCESS:
      return {
        ...state,
        content: action.payload.data.content,
        metadata: action.payload.data.metadata,
        loading: false,
        error: false
      };
    case FETCH_HOME_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
