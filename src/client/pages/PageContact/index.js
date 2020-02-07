import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const PageContact = loadable(() => import(/* webpackPrefetch: true */ './PageContact'), {
  fallback: <Loading />
});

const WrappedPageContact = props => (
  <ErrorBoundary>
    <PageContact { ...props } />
  </ErrorBoundary>
);

export default WrappedPageContact;
