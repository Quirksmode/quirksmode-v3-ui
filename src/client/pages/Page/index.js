import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const Page = loadable(() => import(/* webpackPrefetch: true */ './Page'), {
  fallback: <Loading />
});

const WrappedPage = props => (
  <ErrorBoundary>
    <Page { ...props } />
  </ErrorBoundary>
);

export default WrappedPage;
