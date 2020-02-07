import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const PagePortfolioSingle = loadable(() => import(/* webpackPrefetch: true */ './PagePortfolioSingle'), {
  fallback: <Loading />
});

const WrappedPagePortfolioSingle = props => (
  <ErrorBoundary>
    <PagePortfolioSingle { ...props } />
  </ErrorBoundary>
);

export default WrappedPagePortfolioSingle;
