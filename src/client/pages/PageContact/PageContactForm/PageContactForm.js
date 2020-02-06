import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import SVGInline from 'react-svg-inline';
import { required, email } from 'components/Form/validation';
import { renderInput, renderTextarea } from 'components/Form/fieldTypes';
import IconUser from '!!raw-loader!icons/user.svg';
import IconEmail from '!!raw-loader!icons/email.svg';
import IconWrite from '!!raw-loader!icons/write.svg';
import IconComment from '!!raw-loader!icons/comment.svg';
import IconContact from '!!raw-loader!icons/contact.svg';
import IconQuirksmode from '!!raw-loader!icons/quirksmode.svg';
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
        icon={ IconUser }
      />

      <Field
        type="email"
        name="email"
        id="email"
        component={ renderInput }
        label="Enter your email"
        validate={ [required, email] }
        message="This is wrong."
        icon={ IconEmail }
      />

      <Field
        type="text"
        name="subject"
        id="subject"
        component={ renderInput }
        label="Enter your subject"
        validate={ required }
        message="This is wrong."
        icon={ IconWrite }
      />

      <Field
        name="message"
        id="message"
        component={ renderTextarea }
        label="Enter your message"
        icon={ IconComment }
      />

      <button type="submit" className={ `btn--submitIcon${formSending ? ' btn--submitIcon--loading' : ''} ` } disabled={ submitting }>
          Send Message
        <SVGInline className="btn--submitIconSvg" svg={ IconContact } />
        <SVGInline className="btn--submitIconSvg--loading" svg={ IconQuirksmode } />
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
