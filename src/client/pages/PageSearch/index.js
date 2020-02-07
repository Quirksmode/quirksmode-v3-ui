import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const PageSearch = loadable(() => import(/* webpackPrefetch: true */ './PageSearch'), {
  fallback: <Loading />
});

const WrappedPageSearch = props => (
  <ErrorBoundary>
    <PageSearch { ...props } />
  </ErrorBoundary>
);

export default WrappedPageSearch;
