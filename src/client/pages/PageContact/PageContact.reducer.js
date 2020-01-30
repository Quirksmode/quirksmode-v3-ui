import { FETCH_CONTACT_DATA } from './PageContact.actions';

const initialState = {
  title: '',
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACT_DATA:
      return {
        ...state,
        title: action.payload.data.title,
        metadata: action.payload.data.metadata
      };
    default:
      return state;
  }
};
