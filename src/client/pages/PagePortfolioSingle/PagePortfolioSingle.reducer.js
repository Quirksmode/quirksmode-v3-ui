import {
  FETCH_PORTFOLIO_SINGLE_REQUEST,
  FETCH_PORTFOLIO_SINGLE_SUCCESS
} from './PagePortfolioSingle.actions';

const initialState = {
  loading: '',
  id: null,
  title: '',
  slug: '',
  url: '',
  featuredImage: {},
  content: {
    postContent: '',
    projectTags: [],
    projectScreenshots: [],
    projectURL: '',
  },
  contentBlocks: [],
  related: [],
  noRelated: false,
  hero: {
    url: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_SINGLE_REQUEST: {
      return {
        ...state,
        loading: action.payload
      };
    }
    case FETCH_PORTFOLIO_SINGLE_SUCCESS:
      return {
        ...state,
        id: action.payload.data.id,
        title: action.payload.data.title,
        slug: action.payload.data.slug,
        url: action.payload.data.url,
        featuredImage: action.payload.data.featuredImage,
        content: action.payload.data.content,
        contentBlocks: action.payload.data.contentBlocks,
        related: action.payload.data.related,
        hero: action.payload.data.hero,
        noRelated: action.payload.data.noRelated,
        loading: ''
      };
    default:
      return state;
  }
};
