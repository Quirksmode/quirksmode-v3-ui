export const FETCH_PORTFOLIO_REQUEST = 'fetch_portfolio_request';
export const FETCH_PORTFOLIO_SUCCESS = 'fetch_portfolio_success';
export const FETCH_PORTFOLIO_ERROR = 'fetch_portfolio_error';
export const fetchPortfolioData = (queryVars = '') => async (dispatch, getState, api) => {
  dispatch({
    type: FETCH_PORTFOLIO_REQUEST
  });

  try {
    const res = await api.get(`quirksmode/v1/pages/portfolio${queryVars}`);
    dispatch({
      type: FETCH_PORTFOLIO_SUCCESS,
      payload: res
    });
  } catch {
    dispatch({
      type: FETCH_PORTFOLIO_ERROR
    });
  }
};
