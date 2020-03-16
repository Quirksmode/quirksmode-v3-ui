import {
  FETCH_ABOUT_REQUEST,
  FETCH_ABOUT_SUCCESS,
  FETCH_ABOUT_ERROR
} from './PageAbout.actions';

export const initialState = {
  content: {
    title: '',
    intro: '',
    skillsSections: {
      skillsIcon: '',
      skillsTitle: '',
      skills: []
    },
    cvSections: []
  },
  metadata: {},
  loading: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ABOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_ABOUT_SUCCESS:
      return {
        ...state,
        content: action.payload.data.content,
        metadata: action.payload.data.metadata,
        loading: false,
        error: false
      };
    case FETCH_ABOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
