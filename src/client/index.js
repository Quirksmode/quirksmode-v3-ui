import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { AppContainer } from 'react-hot-loader';
import { loadableReady } from '@loadable/component';
import { createBrowserHistory } from 'history';
import reducers from './redux/combineReducers';
import Container from './Container';

const history = createBrowserHistory();

const axiosInstance = axios.create({
  baseURL: process.env.API_URL
});

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component history={ history } store={ store } />
    </AppContainer>,
    document.querySelector('#root')
  );
};

// loadable-component setup
loadableReady(() => {
  render(Container);
});

/**
 * Render component on HMR update
 */
if (module.hot) {
  module.hot.accept('./Container', () => {
    render(Container);
    // eslint-disable-next-line global-require
    render(require('./Container').default);
  });
}

/**
 * Register service worker
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // eslint-disable-next-line compat/compat
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
