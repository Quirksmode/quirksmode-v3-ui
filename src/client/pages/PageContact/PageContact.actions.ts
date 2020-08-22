import axios from 'axios';
import { PageContactData } from './PageContact.types';
import {
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
} from './PageContact.reducer';
import { AppThunk } from 'client/redux/types';

export const fetchContactData = (): AppThunk => async (dispatch) => {
  dispatch(fetchContactRequest());

  try {
    const res = await axios.get<PageContactData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/contact`
    );
    dispatch(fetchContactSuccess(res.data));
  } catch (err) {
    dispatch(fetchContactError());
  }
};
