import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const PagePortfolio = loadable(() => import(/* webpackPrefetch: true */ './PagePortfolio'), {
  fallback: <Loading />
});

const WrappedPagePortfolio = props => (
  <ErrorBoundary>
    <PagePortfolio { ...props } />
  </ErrorBoundary>
);

export default WrappedPagePortfolio;
