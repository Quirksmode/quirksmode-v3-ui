import {
  FETCH_BLOG_SINGLE_REQUEST,
  FETCH_BLOG_SINGLE_SUCCESS,
  FETCH_BLOG_SINGLE_ERROR
} from './PageBlogSingle.actions';

const initialState = {
  content: {
    id: null,
    title: '',
    url: '',
    date: '',
    hero: {
      url: ''
    },
    contentBlocks: [],
    related: [],
    noRelated: false
  },
  metadata: {},
  loading: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOG_SINGLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_BLOG_SINGLE_SUCCESS:
      return {
        ...state,
        content: action.payload.data.content,
        metadata: action.payload.data.metadata,
        loading: false,
        error: false
      };
    case FETCH_BLOG_SINGLE_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
