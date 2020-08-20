import axios from 'axios';
import { PageSearchData } from './PageSearch.types';
import {
  fetchSearchRequest,
  fetchSearchSuccess,
  fetchSearchError,
} from './PageSearch.reducer';
import { AppThunk } from 'client/redux/types';

export const fetchSearchData = (query: string): AppThunk => async (
  dispatch
) => {
  dispatch(fetchSearchRequest());

  try {
    const res = await axios.get<PageSearchData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/search?s=${query}`
    );
    dispatch(fetchSearchSuccess(res.data));
  } catch (err) {
    dispatch(fetchSearchError());
  }
};
