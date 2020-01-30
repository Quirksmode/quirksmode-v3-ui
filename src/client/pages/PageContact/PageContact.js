import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import SVGInline from 'react-svg-inline';
import { fetchContactData } from './PageContact.actions';
import PageContactForm from './PageContactForm/PageContactForm';
import IconTick from '!!raw-loader!icons/tick.svg';
import IconCross from '!!raw-loader!icons/cross.svg';

const PageContact = ({
  title,
  metadata,
  sending,
  success,
  error,
  fetchContactDataAction
}) => {
  useEffect(() => {
    if (!title) fetchContactDataAction();
  }, [fetchContactDataAction, title]);

  return (
    <div className="Page PageContact">
      <Meta { ...metadata } />
      <section className="Page__section">
        <div className="Page__sectionInner grid">
          <h1>{ title }</h1>
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
};

PageContact.propTypes = {
  title: PropTypes.string,
  metadata: PropTypes.object,
  sending: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  fetchContactDataAction: PropTypes.func
};

const mapStateToProps = ({ pageContact, pageContactForm }) => ({
  title: pageContact.title,
  metadata: pageContact.metadata,
  sending: pageContactForm.sending,
  success: pageContactForm.success,
  error: pageContactForm.error
});

const mapDispatchToProps = dispatch => ({
  fetchContactDataAction: (...args) => dispatch(fetchContactData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageContact);
