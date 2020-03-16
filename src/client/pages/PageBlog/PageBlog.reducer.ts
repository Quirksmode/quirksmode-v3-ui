import {
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOG_ERROR
} from './PageBlog.actions';

export const initialState = {
  content: {
    title: '',
    blogPosts: []
  },
  metadata: {},
  loading: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_BLOG_SUCCESS:
      return {
        ...state,
        content: action.payload.data.content,
        metadata: action.payload.data.metadata,
        loading: false,
        error: false
      };
    case FETCH_BLOG_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
