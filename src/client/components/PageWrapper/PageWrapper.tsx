import React, { Fragment } from 'react';
import Page404 from 'pages/Page404/Page404';
import Loading from 'components/Loading/Loading';
import { PageWrapperProps } from './PageWrapper.types';

/**
 * PageWrapper Component
 */
const PageWrapper = ({
  loading = false,
  error,
  children,
}: PageWrapperProps) => (
  <Fragment>
    {loading && !error && <Loading />}
    {error && !loading && <Page404 />}
    {!error && !loading && children}
  </Fragment>
);

export default PageWrapper;
