import { FETCH_SEARCH_DATA } from './PageSearch.actions';

const initialState = {
  title: '',
  searchPosts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_DATA:
      return {
        ...state,
        title: action.payload.data.title,
        searchPosts: action.payload.data.searchPosts
      };
    default:
      return state;
  }
};
