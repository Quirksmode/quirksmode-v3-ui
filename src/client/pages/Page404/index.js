import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const Page404 = loadable(() => import(/* webpackPrefetch: true */ './Page404'), {
  fallback: <Loading />
});

const WrappedPage404 = props => (
  <ErrorBoundary>
    <Page404 { ...props } />
  </ErrorBoundary>
);

export default WrappedPage404;
