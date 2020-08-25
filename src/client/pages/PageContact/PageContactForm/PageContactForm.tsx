import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
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
import {
  PageContactFormSendMailData,
  PageContactFormProps,
} from './PageContactForm.types';

/**
 * PageContactForm Component
 */
const PageContactForm: React.FC<PageContactFormProps> = ({
  handleSubmit,
  submitting,
  formSending,
}) => {
  const dispatch = useDispatch();
  const submit = (data: PageContactFormSendMailData) => {
    dispatch(sendMail(data));
  };

  useEffect(
    () => () => {
      dispatch(resetForm());
    },
    [resetForm]
  );

  return (
    <form onSubmit={handleSubmit(submit)} className="form PageContactForm">
      <Field
        type="text"
        name="name"
        id="name"
        component={renderInput}
        label="Enter your name"
        validate={required}
        message="This is wrong."
        Icon={IconUser}
      />

      <Field
        type="email"
        name="email"
        id="email"
        component={renderInput}
        label="Enter your email"
        validate={[required, email]}
        message="This is wrong."
        Icon={IconEmail}
      />

      <Field
        type="text"
        name="subject"
        id="subject"
        component={renderInput}
        label="Enter your subject"
        validate={required}
        message="This is wrong."
        Icon={IconWrite}
      />

      <Field
        name="message"
        id="message"
        component={renderTextarea}
        label="Enter your message"
        Icon={IconComment}
      />

      <button
        type="submit"
        className={`btn--submitIcon${
          formSending ? ' btn--submitIcon--loading' : ''
        } `}
        disabled={submitting}
      >
        Send Message
        {formSending ? (
          <IconQuirksmode className="btn--submitIconSvg--loading" />
        ) : (
          <IconContact className="btn--submitIconSvg" />
        )}
      </button>
    </form>
  );
};

const WrappedPageContactForm = reduxForm({
  form: 'contactForm',
})(PageContactForm);

export default WrappedPageContactForm;
