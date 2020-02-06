import {
  FETCH_PORTFOLIO_REQUEST,
  FETCH_PORTFOLIO_SUCCESS,
  FETCH_PORTFOLIO_ERROR
} from './PagePortfolio.actions';

const initialState = {
  content: {
    title: '',
    projects: []
  },
  metadata: {},
  loading: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_PORTFOLIO_SUCCESS:
      return {
        ...state,
        content: action.payload.data.content,
        metadata: action.payload.data.metadata,
        loading: false,
        error: false
      };
    case FETCH_PORTFOLIO_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
