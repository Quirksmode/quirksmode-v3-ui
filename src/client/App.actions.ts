import axios from 'axios';
import { AppData, Utility } from './App.types';
import { Dispatch } from 'redux';
import { AppThunk } from './redux/types';
import {
  fetchAppRequest,
  fetchAppSuccess,
  fetchAppError,
  setLinkLoading as setLinkLoadingAction,
  setLinkLoaded as setLinkLoadedAction,
  setUtility as setUtilityAction,
} from './App.reducer';

export const fetchAppData = (): AppThunk => async (dispatch) => {
  dispatch(fetchAppRequest());

  try {
    const res = await axios.get<AppData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/app`
    );
    dispatch(fetchAppSuccess(res.data));
  } catch (err) {
    dispatch(fetchAppError());
  }
};

export const setLinkLoading = (loadingSlug: string) => (dispatch: Dispatch) => {
  dispatch(setLinkLoadingAction({ loadingSlug }));
};

export const setLinkLoaded = () => (dispatch: Dispatch) => {
  dispatch(setLinkLoadedAction());
};

export const setUtility = (utility: Utility) => (dispatch: Dispatch) => {
  dispatch(setUtilityAction({ utility }));
};
