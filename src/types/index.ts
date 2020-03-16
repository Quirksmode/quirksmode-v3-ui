import { RouterState } from 'connected-react-router';
import { Action } from 'redux';
import { ThunkAction as Act, ThunkDispatch as Dispatch } from 'redux-thunk';
import { PageHomeState } from 'pages/PageHome/PageHome.types';

export interface StoreState {
  pageHome: PageHomeState;
}
