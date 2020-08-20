import axios from 'axios';
import { PagePortfolioData } from './PagePortfolio.types';
import {
  fetchPortfolioRequest,
  fetchPortfolioSuccess,
  fetchPortfolioError,
} from './PagePortfolio.reducer';
import { AppThunk } from 'client/redux/types';

export const fetchPortfolioData = (queryVars = ''): AppThunk => async (
  dispatch
) => {
  dispatch(fetchPortfolioRequest());

  try {
    const res = await axios.get<PagePortfolioData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/portfolio${queryVars}`
    );
    dispatch(fetchPortfolioSuccess(res.data));
  } catch (err) {
    dispatch(fetchPortfolioError());
  }
};
