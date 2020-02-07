import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import SVGInline from 'react-svg-inline';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchContactData } from './PageContact.actions';
import PageContactForm from './PageContactForm/PageContactForm';
import IconTick from '!!raw-loader!icons/tick.svg';
import IconCross from '!!raw-loader!icons/cross.svg';

const PageContact = ({
  fetchContactDataAction,
  content,
  metadata,
  loading,
  error,
  formSending,
  formSuccess,
  formError
}) => {
  const {
    title
  } = content;

  useEffect(() => {
    if (!title) fetchContactDataAction();
  }, [fetchContactDataAction, title]);

  return (
    <PageWrapper error={ error }>
      { title && (
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
              { formSuccess && (
              <p className="PageContact__message PageContact__message--success form__messageInlineWrap">
                <SVGInline svg={ IconTick } />
                <span>Success, your message has been sent.</span>
              </p>
              )}
              { formError && (
              <p className="PageContact__message PageContact__message--error form__messageInlineWrap">
                <SVGInline svg={ IconCross } />
                <span>Error, form failed to send.</span>
              </p>
              )}
              <PageContactForm formSending={ formSending } />
            </div>
          </section>
        </div>
      )}
    </PageWrapper>
  );
};

PageContact.propTypes = {
  fetchContactDataAction: PropTypes.func,
  content: PropTypes.object,
  metadata: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  formSending: PropTypes.bool,
  formSuccess: PropTypes.bool,
  formError: PropTypes.bool
};

const mapStateToProps = ({ pageContact, pageContactForm }) => ({
  content: pageContact.content,
  metadata: pageContact.metadata,
  loading: pageContact.loading,
  error: pageContact.error,
  formSending: pageContactForm.formSending,
  formSuccess: pageContactForm.formSuccess,
  formError: pageContactForm.formError
});

const mapDispatchToProps = dispatch => ({
  fetchContactDataAction: (...args) => dispatch(fetchContactData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageContact);
