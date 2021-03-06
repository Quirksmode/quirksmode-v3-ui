import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const PageHome = loadable(() => import(/* webpackPrefetch: true */ './PageHome'), {
  fallback: <Loading />
});

const WrappedPageHome = props => (
  <ErrorBoundary>
    <PageHome { ...props } />
  </ErrorBoundary>
);

export default WrappedPageHome;
