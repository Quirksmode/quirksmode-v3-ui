import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import IconTick from 'icons/tick.svg';
import IconCross from 'icons/cross.svg';
import { fetchContactData } from './PageContact.actions';
import PageContactForm from './PageContactForm/PageContactForm';

/**
 * Contact Page
 *
 * @name PageHome
 * @param {function} props.fetchContactDataAction - Redux action to Fetch the Contact Page Data
 * @param {object} props.content - The content for this Page
 * @param {object} props.metadata - The metadata for this Page
 * @param {boolean} props.loading - Flag for while the data is being fetched
 * @param {boolean} props.error - Flag for if there is an error fetching the data
 * @param {boolean} props.formSending - Flag for when the form is sending
 * @param {boolean} props.formSuccess - Flag for when the form has successfully sent
 * @param {boolean} props.formError - Flag for when the form has not successfully sent
 * @return {JSXElement}
 */
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
  /**
   * @type {Object}
   * @property {string} content.title - The Page Title
   */
  const {
    title
  } = content;

  /**
   * Fetch the Contact Page Data via Redux, but only if the data does not already exist
   */
  useEffect(() => {
    if (!title) fetchContactDataAction();
  }, [fetchContactDataAction, title]);

  return (
    <PageWrapper error={ error } loading={ loading }>
      { title && (
        <div className="Page PageContact">
          { metadata && <Meta { ...metadata } /> }
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
                <IconTick />
                <span>Success, your message has been sent.</span>
              </p>
              )}
              { formError && (
              <p className="PageContact__message PageContact__message--error form__messageInlineWrap">
                <IconCross />
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
