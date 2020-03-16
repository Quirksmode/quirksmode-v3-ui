import axios from 'axios';
import { ActionTypes, PageHomeState } from './PageHome.types';
import { Dispatch } from 'redux';

export interface FetchHomeDataAction {
  type:
    | typeof ActionTypes.FETCH_HOME_REQUEST
    | typeof ActionTypes.FETCH_HOME_SUCCESS
    | typeof ActionTypes.FETCH_HOME_ERROR;
  payload?: PageHomeState;
}

export const fetchHomeData = () => async (dispatch: Dispatch) => {
  dispatch<FetchHomeDataAction>({
    type: ActionTypes.FETCH_HOME_REQUEST
  });

  try {
    const res = await axios.get<PageHomeState>(
      `${process.env.CMS_URL}/wp-json/quirksmode/v1/pages/home`
    );
    dispatch<FetchHomeDataAction>({
      type: ActionTypes.FETCH_HOME_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch<FetchHomeDataAction>({
      type: ActionTypes.FETCH_HOME_ERROR
    });
  }
};
