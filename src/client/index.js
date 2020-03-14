import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { loadableReady } from '@loadable/component';
import { createBrowserHistory } from 'history';
import { Workbox } from 'workbox-window';
import configureStore from './redux/store';
import Container from './Container';

/**
 * Setup history API
 */
const history = createBrowserHistory();

/**
 * Hydrate redux store from back-end data
 */
const initialState = window.INITIAL_STATE;
delete window.INITIAL_STATE;
const store = configureStore(initialState, history);

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
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  const wb = new Workbox('/sw.js');
  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      window.location.reload();
    }
  });
  wb.register();
}
