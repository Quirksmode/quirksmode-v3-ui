import { FETCH_HOME_DATA } from './PageHome.actions';

const initialState = {
  heroSlides: [],
  featuredWork: [],
  intro: null,
  latestBlogPosts: [],
  skills: [],
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_DATA:
      return {
        ...state,
        heroSlides: action.payload.data.heroSlides,
        featuredWork: action.payload.data.featuredWork,
        intro: action.payload.data.intro,
        latestBlogPosts: action.payload.data.latestBlogPosts,
        skills: action.payload.data.skills,
        metadata: action.payload.data.metadata
      };
    default:
      return state;
  }
};
