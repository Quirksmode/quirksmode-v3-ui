import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading/Loading';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const PageBlog = loadable(() => import(/* webpackPrefetch: true */ './PageBlog'), {
  fallback: <Loading />
});

const WrappedPageBlog = props => (
  <ErrorBoundary>
    <PageBlog { ...props } />
  </ErrorBoundary>
);

export default WrappedPageBlog;
