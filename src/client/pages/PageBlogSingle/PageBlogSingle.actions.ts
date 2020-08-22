import { push } from 'connected-react-router';
import axios from 'axios';
import { setLinkLoading, setLinkLoaded } from 'client/App.actions';
import { PageBlogSingleData } from './PageBlogSingle.types';
import {
  fetchBlogSingleRequest,
  fetchBlogSingleSuccess,
  fetchBlogSingleError,
} from './PageBlogSingle.reducer';
import { AppThunk } from 'client/redux/types';

export const fetchBlogSingleData = (
  slug: string,
  href: string = null
): AppThunk => async (dispatch) => {
  // Set the loading state
  dispatch(fetchBlogSingleRequest());

  // If href, dispatch custom Link Loader Functionality
  if (href) {
    dispatch(setLinkLoading(href));
  }

  try {
    const res = await axios.get<PageBlogSingleData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/blog/${slug}`
    );

    dispatch(fetchBlogSingleSuccess(res.data));

    // If href, navigate to it
    if (href) {
      dispatch(setLinkLoaded());
      dispatch(push(href));
    }
  } catch {
    dispatch(fetchBlogSingleError());
  }
};
