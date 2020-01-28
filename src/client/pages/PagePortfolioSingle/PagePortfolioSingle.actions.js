import { push } from 'connected-react-router';

export const FETCH_PORTFOLIO_SINGLE_REQUEST = 'fetch_portfolio_single_request';
export const FETCH_PORTFOLIO_SINGLE_SUCCESS = 'fetch_portfolio_single_success';
export const FETCH_PORTFOLIO_SINGLE_ERROR = 'fetch_portfolio_single_error';
export const fetchPortfolioSingleData = (slug, href = null) => async (
  dispatch,
  getState,
  api
) => {
  // Set the loading state
  dispatch({
    type: FETCH_PORTFOLIO_SINGLE_REQUEST,
    payload: slug
  });

  const res = await api.get(`quirksmode/v1/pages/portfolio/${slug}`);

  dispatch({
    type: FETCH_PORTFOLIO_SINGLE_SUCCESS,
    payload: res
  });

  // If a href is passed, navigate to it
  if (href) {
    dispatch(push(href));
  }
};
