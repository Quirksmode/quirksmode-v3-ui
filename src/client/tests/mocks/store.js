import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from 'client/redux/combineReducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export default state => mockStore({
  ...initialState,
  ...state
});
