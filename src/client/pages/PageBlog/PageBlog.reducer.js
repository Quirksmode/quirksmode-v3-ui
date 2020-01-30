import { FETCH_BLOG_DATA } from './PageBlog.actions';

const initialState = {
  title: '',
  blogPosts: [],
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOG_DATA:
      return {
        ...state,
        title: action.payload.data.title,
        blogPosts: action.payload.data.blogPosts,
        metadata: action.payload.data.metadata
      };
    default:
      return state;
  }
};
