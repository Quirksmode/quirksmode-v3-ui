import {
  FETCH_BLOG_SINGLE_REQUEST,
  FETCH_BLOG_SINGLE_SUCCESS,
  FETCH_BLOG_SINGLE_ERROR
} from './PageBlogSingle.actions';

const initialState = {
  loading: '',
  error: false,
  id: null,
  title: '',
  url: '',
  contentBlocks: [],
  date: '',
  related: [],
  noRelated: false,
  hero: {
    url: ''
  },
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOG_SINGLE_REQUEST:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_BLOG_SINGLE_SUCCESS:
      return {
        ...state,
        id: action.payload.data.id,
        title: action.payload.data.title,
        url: action.payload.data.url,
        contentBlocks: action.payload.data.contentBlocks,
        date: action.payload.data.date,
        related: action.payload.data.related,
        noRelated: action.payload.data.noRelated,
        hero: action.payload.data.hero,
        metadata: action.payload.data.metadata,
        loading: ''
      };
    case FETCH_BLOG_SINGLE_ERROR:
      return {
        ...initialState,
        loading: '',
        error: true
      };
    default:
      return state;
  }
};
