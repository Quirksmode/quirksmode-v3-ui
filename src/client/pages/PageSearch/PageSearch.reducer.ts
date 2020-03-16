import {
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_ERROR
} from './PageSearch.actions';

export const initialState = {
  content: {
    title: '',
    searchPosts: []
  },
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        content: action.payload.data.content,
        metadata: action.payload.data.metadata,
        loading: false,
        error: false
      };
    case FETCH_SEARCH_ERROR:
      return {
        ...initialState,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
