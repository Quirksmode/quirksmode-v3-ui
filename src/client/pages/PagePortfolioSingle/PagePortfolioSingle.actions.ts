import { push } from 'connected-react-router';
import axios from 'axios';
import { setLinkLoading, setLinkLoaded } from '../../App.actions';

export const FETCH_PORTFOLIO_SINGLE_REQUEST = 'fetch_portfolio_single_request';
export const FETCH_PORTFOLIO_SINGLE_SUCCESS = 'fetch_portfolio_single_success';
export const FETCH_PORTFOLIO_SINGLE_ERROR = 'fetch_portfolio_single_error';
export const fetchPortfolioSingleData = (slug, href = null) => async (
  dispatch
) => {
  // Set the loading state
  dispatch({
    type: FETCH_PORTFOLIO_SINGLE_REQUEST
  });

  // If href, dispatch custom Link Loader Functionality
  if (href) {
    dispatch(setLinkLoading(href));
  }

  try {
    const res = await axios.get(`https://cms.quirksmode.co.uk/wp-json/quirksmode/v1/pages/portfolio/${slug}`);

    dispatch({
      type: FETCH_PORTFOLIO_SINGLE_SUCCESS,
      payload: res
    });

    // If href, navigate to it
    if (href) {
      dispatch(setLinkLoaded());
      dispatch(push(href));
    }
  } catch {
    dispatch({
      type: FETCH_PORTFOLIO_SINGLE_ERROR
    });
  }
};
