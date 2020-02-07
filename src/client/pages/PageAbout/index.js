import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const PageAbout = loadable(() => import(/* webpackPrefetch: true */ './PageAbout'), {
  fallback: <Loading />
});

const WrappedPageAbout = props => (
  <ErrorBoundary>
    <PageAbout { ...props } />
  </ErrorBoundary>
);

export default WrappedPageAbout;
