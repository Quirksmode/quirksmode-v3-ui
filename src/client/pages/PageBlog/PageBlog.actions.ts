import axios from 'axios';
import { PageBlogData } from './PageBlog.types';
import {
  fetchBlogRequest,
  fetchBlogSuccess,
  fetchBlogError,
} from './PageBlog.reducer';
import { AppThunk } from 'client/redux/types';

export const fetchBlogData = (queryVars = ''): AppThunk => async (dispatch) => {
  dispatch(fetchBlogRequest());

  try {
    const res = await axios.get<PageBlogData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/blog${queryVars}`
    );
    dispatch(fetchBlogSuccess(res.data));
  } catch (err) {
    dispatch(fetchBlogError());
  }
};
