import { push } from 'connected-react-router';
import axios from 'axios';
import { setLinkLoading, setLinkLoaded } from 'client/App.actions';
import { PagePortfolioSingleData } from './PagePortfolioSingle.types';
import {
  fetchPortfolioSingleRequest,
  fetchPortfolioSingleSuccess,
  fetchPortfolioSingleError,
} from './PagePortfolioSingle.reducer';
import { AppThunk } from 'client/redux/types';

export const fetchPortfolioSingleData = (
  slug: string,
  href: string = null
): AppThunk => async (dispatch) => {
  // Set the loading state
  dispatch(fetchPortfolioSingleRequest());

  // If href, dispatch custom Link Loader Functionality
  if (href) {
    dispatch(setLinkLoading(href));
  }

  try {
    const res = await axios.get<PagePortfolioSingleData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/portfolio/${slug}`
    );

    dispatch(fetchPortfolioSingleSuccess(res.data));

    // If href, navigate to it
    if (href) {
      dispatch(setLinkLoaded());
      dispatch(push(href));
    }
  } catch {
    dispatch(fetchPortfolioSingleError());
  }
};
