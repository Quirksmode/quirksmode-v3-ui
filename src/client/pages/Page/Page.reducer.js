import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_ERROR
} from './Page.actions';

const initialState = {
  loading: '',
  title: '',
  content: '',
  contentBlocks: [],
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        title: action.payload.data.title,
        content: action.payload.data.content,
        contentBlocks: action.payload.data.contentBlocks,
        metadata: action.payload.data.metadata,
        loading: ''
      };
    case FETCH_PAGE_ERROR:
      return {
        ...initialState,
        loading: '',
        error: true
      };
    default:
      return state;
  }
};
