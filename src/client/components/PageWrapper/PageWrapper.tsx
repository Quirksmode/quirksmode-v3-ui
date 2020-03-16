import React, { Fragment, ReactNode } from 'react';
import Page404 from 'pages/Page404/Page404';
import Loading from 'components/Loading/Loading';

interface Args {
  loading?: boolean;
  error: boolean;
  children: ReactNode;
}

/**
 * PageWrapper Component
 *
 * @name PageWrapper
 * @param  {boolean} props.isNew
 */
const PageWrapper = ({ loading = false, error, children }: Args) => (
  <Fragment>
    {loading && !error && <Loading />}
    {error && !loading && <Page404 />}
    {!error && !loading && children}
  </Fragment>
);

export default PageWrapper;
