import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import '../assets/css/styles.css';

const Container = ({ history, store }) => (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>
);

Container.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default Container;
