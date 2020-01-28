import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import axios from 'axios';
import reducers from './combineReducers';

// Redux store instance
let store;

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
export default function configureStore(initialState, axiosConfig, history = null) {
  const axiosInstance = axios.create(axiosConfig);

  // Setup middlewares for history tracking and thunks
  const middleware = [thunk.withExtraArgument(axiosInstance)];
  if (history) {
    middleware.push(routerMiddleware(history));
  }

  // When in development include redux dev tools
  const composer = process.env.NODE_ENV === 'development' && __CLIENT__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

  store = createStore(
    reducers(history),
    initialState,
    composer(
      applyMiddleware(...middleware)
    )
  );

  if (module.hot) {
    module.hot.accept(reducers, () => {
      store.replaceReducer(reducers);
    });
  }

  return store;
}
