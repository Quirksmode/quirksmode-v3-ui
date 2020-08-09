import axios from 'axios';
import { AppActionTypes, AppData, Utility } from './App.types';
import { Dispatch } from 'redux';

export interface FetchAppDataAction {
  type:
    | AppActionTypes.FETCH_APP_REQUEST
    | AppActionTypes.FETCH_APP_SUCCESS
    | AppActionTypes.FETCH_APP_ERROR;
  payload?: AppData;
}

export const fetchAppData = () => async (dispatch: Dispatch) => {
  dispatch<FetchAppDataAction>({
    type: AppActionTypes.FETCH_APP_REQUEST,
  });

  try {
    const res = await axios.get<AppData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/app`
    );
    dispatch<any>({
      type: 'TEST',
      payload: res.data,
    });
    console.log('FETCH_APP_SUCCESS res.data', res.data);
  } catch (err) {
    dispatch<FetchAppDataAction>({
      type: AppActionTypes.FETCH_APP_ERROR,
    });
  }
};

export interface SetLinkLoadingAction {
  type: typeof AppActionTypes.SET_LINK_LOADING;
  payload: string;
}

export interface SetLinkLoadedAction {
  type: typeof AppActionTypes.SET_LINK_LOADED;
}

export interface SetUtilityAction {
  type: typeof AppActionTypes.SET_UTILITY;
  payload: Utility;
}

export const setLinkLoading = (href: string) => (dispatch: Dispatch) => {
  dispatch<SetLinkLoadingAction>({
    type: AppActionTypes.SET_LINK_LOADING,
    payload: href,
  });
};

export const setLinkLoaded = () => (dispatch: Dispatch) => {
  dispatch<SetLinkLoadedAction>({
    type: AppActionTypes.SET_LINK_LOADED,
  });
};

export const setUtility = (utility: Utility) => (dispatch: Dispatch) => {
  dispatch<SetUtilityAction>({
    type: AppActionTypes.SET_UTILITY,
    payload: utility,
  });
};
