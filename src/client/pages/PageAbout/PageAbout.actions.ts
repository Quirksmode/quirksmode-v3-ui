import axios from 'axios';
import { PageAboutData } from './PageAbout.types';
import {
  fetchAboutRequest,
  fetchAboutSuccess,
  fetchAboutError,
} from './PageAbout.reducer';
import { AppThunk } from 'client/redux/types';

export const fetchAboutData = (): AppThunk => async (dispatch) => {
  dispatch(fetchAboutRequest());

  try {
    const res = await axios.get<PageAboutData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/about-me`
    );
    dispatch(fetchAboutSuccess(res.data));
  } catch (err) {
    dispatch(fetchAboutError());
  }
};
