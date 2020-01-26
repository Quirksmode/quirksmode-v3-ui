import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import '../assets/css/styles.css';

const Container = ({ store }) => (
  <Provider store={ store }>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);

Container.propTypes = {
  store: PropTypes.object
};

export default Container;
