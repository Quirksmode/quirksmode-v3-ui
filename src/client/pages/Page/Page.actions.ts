import { push } from 'connected-react-router';
import axios from 'axios';
import { PageData } from './Page.types';
import {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageError,
} from './Page.reducer';
import { setLinkLoading, setLinkLoaded } from '../../App.actions';
import { AppThunk } from 'client/redux/types';

export const fetchPageData = (
  slug: string,
  href: string = null
): AppThunk => async (dispatch) => {
  // Set the loading state
  dispatch(fetchPageRequest());

  // If href, dispatch custom Link Loader Functionality
  if (href) {
    dispatch(setLinkLoading(href));
  }

  try {
    const res = await axios.get<PageData>(
      `https://cms.quirksmode.co.uk/wp-json/quirksmode/v1/pages/${slug}`
    );

    dispatch(fetchPageSuccess(res.data));

    // If href, navigate to it
    if (href) {
      dispatch(setLinkLoaded());
      dispatch(push(href));
    }
  } catch {
    dispatch(fetchPageError());
  }
};
