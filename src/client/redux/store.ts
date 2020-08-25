import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './rootReducer';
import { CreateStoreProps } from './types';

/**
 * Instantiate and configure redux store, invoked from both
 * server and client renderers
 */
const createStore = ({ initialState, url }: CreateStoreProps = {}) => {
  const history = __SERVER__
    ? createMemoryHistory({
        initialEntries: [url || '/'],
      })
    : createBrowserHistory();
  const store = configureStore({
    preloadedState: initialState,
    reducer: rootReducer(history),
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      routerMiddleware(history),
    ],
    devTools: process.env.NODE_ENV === 'development' && __CLIENT__,
  });

  if ((module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('./rootReducer', () => {
      try {
        const createNextReducer = require('./rootReducer').default;

        store.replaceReducer(createNextReducer(history));
      } catch (error) {
        console.error(`Reducer hot reloading error ${error}`);
      }
    });
  }

  return { store, history };
};

export default createStore;
