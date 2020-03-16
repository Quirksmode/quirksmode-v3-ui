import { compose, createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducers from './combineReducers';

// Redux store instance
let store: Store;

/**
 * @name getStore
 * @description get the current redux store instance
 * @return {function} function to return the redux store from local scope
 */
export const getStore = () => store;

/**
 * @name configureStore
 * @description instantiate and configure redux store, invoked from both
 *              server and client renders
 * @param  {object} initialState [redux stores initial state]
 * @param  {object} history      [react router history]
 * @return {function}            [function to create and configure redux store]
 */
export default function configureStore(
  initialState = {},
  history: History | null = null
) {
  // Setup middlewares for history tracking and thunks
  const middleware = [thunk];
  if (history) {
    middleware.push(routerMiddleware(history));
  }

  // When in development include redux dev tools
  const composer =
    process.env.NODE_ENV === 'development' && __CLIENT__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;

  store = createStore(
    reducers(history),
    initialState,
    composer(applyMiddleware(...middleware))
  );

  if ((module as any).hot) {
    (module as any).hot.accept(reducers, () => {
      store.replaceReducer(reducers);
    });
  }

  return store;
}
