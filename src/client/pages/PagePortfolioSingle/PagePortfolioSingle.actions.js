import { push } from 'connected-react-router';
import { setLinkLoading, setLinkLoaded } from '../../App.actions';

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

  // If href, dispatch custom Link Loader Functionality
  if (href) {
    dispatch(setLinkLoading(href));
  }

  const res = await api.get(`quirksmode/v1/pages/portfolio/${slug}`);

  dispatch({
    type: FETCH_PORTFOLIO_SINGLE_SUCCESS,
    payload: res
  });

  // If href, navigate to it
  if (href) {
    dispatch(setLinkLoaded());
    dispatch(push(href));
  }
};
