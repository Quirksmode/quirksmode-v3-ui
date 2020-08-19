import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { loadableReady } from '@loadable/component';
import { createBrowserHistory } from 'history';
import { Workbox } from 'workbox-window';
import createStore from 'client/redux/store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import '../assets/css/styles.css';

/**
 * Hydrate redux store from back-end data
 */
const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;
const { store, history } = createStore({ initialState });

const render = (Routes: Array<object>) => {
  const renderMethod = (module as any).hot ? ReactDOM.render : ReactDOM.hydrate;

  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(Routes)}
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// loadable-component setup
loadableReady(() => {
  render(routes);
});

/**
 * Render component on HMR update
 */
if ((module as any).hot) {
  (module as any).hot.accept('./routes', () => {
    try {
      render(routes);
    } catch (err) {
      console.error(`Routes hot reloading error ${err}`);
    }
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
