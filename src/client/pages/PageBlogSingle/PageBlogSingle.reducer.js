import { FETCH_BLOG_SINGLE } from './PageBlogSingle.actions';

const initialState = {
  id: null,
  title: '',
  url: '',
  contentBlocks: [],
  date: '',
  related: [],
  noRelated: false,
  hero: {
    url: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOG_SINGLE:
      return {
        ...state,
        id: action.payload.data.id,
        title: action.payload.data.title,
        url: action.payload.data.url,
        contentBlocks: action.payload.data.contentBlocks,
        date: action.payload.data.date,
        related: action.payload.data.related,
        noRelated: action.payload.data.noRelated,
        hero: action.payload.data.hero
      };
    default:
      return state;
  }
};
