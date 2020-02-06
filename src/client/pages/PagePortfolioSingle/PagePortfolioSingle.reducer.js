import {
  FETCH_PORTFOLIO_SINGLE_REQUEST,
  FETCH_PORTFOLIO_SINGLE_SUCCESS,
  FETCH_PORTFOLIO_SINGLE_ERROR
} from './PagePortfolioSingle.actions';

const initialState = {
  content: {
    id: null,
    title: '',
    slug: '',
    url: '',
    hero: {
      url: ''
    },
    projectTags: [],
    screenshots: [],
    projectURL: '',
    contentBlocks: [],
    related: [],
    noRelated: false,
  },
  loading: false,
  error: false,
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_SINGLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_PORTFOLIO_SINGLE_SUCCESS:
      return {
        ...state,
        content: action.payload.data.content,
        metadata: action.payload.data.metadata,
        loading: false,
        error: false
      };
    case FETCH_PORTFOLIO_SINGLE_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
