import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import SVGInline from 'react-svg-inline';
import PageContactForm from './PageContactForm/PageContactForm';
import IconTick from '!!raw-loader!icons/tick.svg';
import IconCross from '!!raw-loader!icons/cross.svg';

const PageContact = ({
  sending,
  success,
  error
}) => (
  <div className="Page PageContact">
    <Helmet>
      <title>Contact Helmet Test</title>
      <meta property="og:title" content="Portfolio Page" />
    </Helmet>
    <section className="Page__section">
      <div className="Page__sectionInner grid">
        <h1>Contact</h1>
        <Breadcrumbs>
          <span className="Breadcrumbs__divider">&gt;</span>
          <span className="Breadcrumbs__active">Contact</span>
        </Breadcrumbs>
        <p>Please feel free to contact me using the form below.</p>
        { success && (
          <p className="PageContact__message PageContact__message--success form__messageInlineWrap">
            <SVGInline svg={ IconTick } />
            <span>Success, your message has been sent.</span>
          </p>
        )}
        { error && (
          <p className="PageContact__message PageContact__message--error form__messageInlineWrap">
            <SVGInline svg={ IconCross } />
            <span>Error, form failed to send.</span>
          </p>
        )}
        <PageContactForm sending={ sending } />
      </div>
    </section>
  </div>
);

PageContact.propTypes = {
  sending: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool
};

const mapStateToProps = ({ pageContactForm }) => ({
  sending: pageContactForm.sending,
  success: pageContactForm.success,
  error: pageContactForm.error,
});

export default connect(mapStateToProps, null)(PageContact);
