import { FETCH_ABOUT_DATA } from './PageAbout.actions';

const initialState = {
  title: '',
  content: '',
  skillsSections: {
    skillsIcon: '',
    skillsTitle: '',
    skills: []
  },
  cvSections: [],
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ABOUT_DATA:
      return {
        ...state,
        title: action.payload.data.title,
        content: action.payload.data.content,
        skillsSections: action.payload.data.skillsSections,
        cvSections: action.payload.data.cvSections,
        metadata: action.payload.data.metadata
      };
    default:
      return state;
  }
};
