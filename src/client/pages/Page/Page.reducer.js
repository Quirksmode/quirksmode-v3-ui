import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_ERROR
} from './Page.actions';

export const initialState = {
  content: {
    title: '',
    pageContent: '',
    contentBlocks: []
  },
  metadata: {},
  loading: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        content: action.payload.data.content,
        metadata: action.payload.data.metadata,
        loading: false,
        error: false
      };
    case FETCH_PAGE_ERROR:
      return {
        ...initialState,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
