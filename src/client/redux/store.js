import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import https from 'https';

import reducers from './combineReducers';

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: { cookie: req.get('cookie') || '' },
    // Used for Local Development - Prevents content being blocked by a self signed certificate
    httpsAgent: new https.Agent({
      rejectUnauthorized: (process.env.LOCALENV !== 'true')
    })
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  if (module.hot) {
    module.hot.accept('./combineReducers', () => {
      store.replaceReducer(reducers.default);
    });
  }

  return store;
};
