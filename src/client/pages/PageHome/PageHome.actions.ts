import axios from 'axios';
import { PageHomeData } from './PageHome.types';
import {
  fetchHomeRequest,
  fetchHomeSuccess,
  fetchHomeError,
} from './PageHome.reducer';
import { AppThunk } from 'client/redux/types';

export const fetchHomeData = (): AppThunk => async (dispatch) => {
  dispatch(fetchHomeRequest());

  try {
    const res = await axios.get<PageHomeData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/home`
    );
    dispatch(fetchHomeSuccess(res.data));
  } catch (err) {
    dispatch(fetchHomeError());
  }
};
