import axios from 'axios';
import { ActionTypes, PageHomeData } from './PageHome.types';
import { Dispatch } from 'redux';

export interface FetchHomeDataAction {
  type:
    | ActionTypes.FETCH_HOME_REQUEST
    | ActionTypes.FETCH_HOME_SUCCESS
    | ActionTypes.FETCH_HOME_ERROR;
  payload?: PageHomeData;
}

export const fetchHomeData = () => async (dispatch: Dispatch) => {
  dispatch<FetchHomeDataAction>({
    type: ActionTypes.FETCH_HOME_REQUEST,
  });

  try {
    const res = await axios.get<PageHomeData>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/home`
    );
    dispatch<FetchHomeDataAction>({
      type: ActionTypes.FETCH_HOME_SUCCESS,
      payload: res.data,
    });
    console.log('fetchHomeData', res.data);
  } catch (err) {
    dispatch<FetchHomeDataAction>({
      type: ActionTypes.FETCH_HOME_ERROR,
    });
  }
};
