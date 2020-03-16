import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required, email } from 'components/Form/validation';
import { renderInput, renderTextarea } from 'components/Form/fieldTypes';
import IconUser from 'icons/user.svg';
import IconEmail from 'icons/email.svg';
import IconWrite from 'icons/write.svg';
import IconComment from 'icons/comment.svg';
import IconContact from 'icons/contact.svg';
import IconQuirksmode from 'icons/quirksmode.svg';
import { sendMail, resetForm } from './PageContactForm.actions';

/**
 * Description
 *
 * @name PageContactForm
 * @param  {object} props.cv []
 */
const PageContactForm = ({
  handleSubmit,
  submitting,
  sendMailAction,
  resetFormAction,
  formSending
}) => {
  const submit = (data) => {
    sendMailAction(data);
  };

  useEffect(() => () => {
    resetFormAction();
  }, [resetFormAction]);

  return (
    <form onSubmit={ handleSubmit(submit) } className="form PageContactForm">
      <Field
        type="text"
        name="name"
        id="name"
        component={ renderInput }
        label="Enter your name"
        validate={ required }
        message="This is wrong."
        Icon={ IconUser }
      />

      <Field
        type="email"
        name="email"
        id="email"
        component={ renderInput }
        label="Enter your email"
        validate={ [required, email] }
        message="This is wrong."
        Icon={ IconEmail }
      />

      <Field
        type="text"
        name="subject"
        id="subject"
        component={ renderInput }
        label="Enter your subject"
        validate={ required }
        message="This is wrong."
        Icon={ IconWrite }
      />

      <Field
        name="message"
        id="message"
        component={ renderTextarea }
        label="Enter your message"
        Icon={ IconComment }
      />

      <button type="submit" className={ `btn--submitIcon${formSending ? ' btn--submitIcon--loading' : ''} ` } disabled={ submitting }>
          Send Message
        <IconContact className="btn--submitIconSvg" />
        <IconQuirksmode className="btn--submitIconSvg--loading" />
      </button>
    </form>
  );
};

PageContactForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  sendMailAction: PropTypes.func,
  resetFormAction: PropTypes.func,
  formSending: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  sendMailAction: (...args) => dispatch(sendMail(...args)),
  resetFormAction: (...args) => dispatch(resetForm(...args))
});

const ContactForm = reduxForm({
  form: 'contactForm'
})(PageContactForm);

export default connect(null, mapDispatchToProps)(ContactForm);
