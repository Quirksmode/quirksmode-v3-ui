import {
  FETCH_PORTFOLIO_DATA
} from './PagePortfolio.actions';

const initialState = {
  title: '',
  projects: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_DATA:
      return {
        ...state,
        title: action.payload.data.title,
        projects: action.payload.data.projects
      };
    default:
      return state;
  }
};
