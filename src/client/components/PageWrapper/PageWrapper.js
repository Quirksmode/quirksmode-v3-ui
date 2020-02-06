import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Page404 from 'pages/Page404/Page404';
import Loading from 'components/Loading/Loading';

/**
 * PageWrapper Component
 *
 * @name PageWrapper
 * @param  {boolean} props.isNew
 */
const PageWrapper = ({
  loading = false,
  error,
  children
}) => (
  <Fragment>
    { loading && !error && <Loading />}
    { error && !loading && <Page404 />}
    { !error && !loading && children}
  </Fragment>
);

PageWrapper.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.any
};

export default PageWrapper;
