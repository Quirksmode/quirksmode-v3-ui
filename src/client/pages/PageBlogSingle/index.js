import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const PageBlogSingle = loadable(() => import(/* webpackPrefetch: true */ './PageBlogSingle'), {
  fallback: <Loading />
});

const WrappedPageBlogSingle = props => (
  <ErrorBoundary>
    <PageBlogSingle { ...props } />
  </ErrorBoundary>
);

export default WrappedPageBlogSingle;
