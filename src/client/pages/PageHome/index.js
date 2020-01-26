import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const Home = loadable(() => import('./PageHome'), {
  fallback: <Loading />
});

const WrappedHome = props => (
  <ErrorBoundary>
    <Home { ...props } />
  </ErrorBoundary>
);

export default WrappedHome;
