import { FETCH_PAGE_DATA } from './Page.actions';

const initialState = {
  title: '',
  content: '',
  contentBlocks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE_DATA:
      return {
        ...state,
        title: action.payload.data.title,
        content: action.payload.data.content,
        contentBlocks: action.payload.data.contentBlocks
      };
    default:
      return state;
  }
};
