export const FETCH_PORTFOLIO_DATA = 'fetch_portfolio_data';

export const fetchPortfolioData = (queryVars = '') => async (dispatch, getState, api) => {
  const res = await api.get(`quirksmode/v1/pages/portfolio${queryVars}`);

  dispatch({
    type: FETCH_PORTFOLIO_DATA,
    payload: res
  });
};
