import React from 'react';
import IconCross from 'icons/cross.svg';

export interface RenderInputProps {
  className: string;
  label?: string;
  input?: any;
  id: string;
  placeholder?: string;
  type?: string;
  Icon?: any;
  message?: string;
  meta?: {
    touched?: boolean;
    error?: boolean;
    warning?: boolean;
  };
}

// Textfield
export const renderInput: React.FC<RenderInputProps> = ({
  label,
  input,
  id,
  type,
  Icon,
  message,
  meta: { touched, error },
}) => (
  <div className="form__item">
    <label htmlFor={id}>
      {Icon && <Icon />}
      <span className="visuallyHidden">{label}</span>
    </label>
    <input {...input} placeholder={label} type={type} id={id} />
    {touched && error && (
      <span role="alert" className="form__messageInlineWrap">
        <IconCross />
        <span className="form__messageInline">{message}</span>
      </span>
    )}
  </div>
);

// Textarea
export const renderTextarea: React.FC<RenderInputProps> = ({
  label,
  input,
  id,
  type,
  Icon,
  message,
  meta: { touched, error },
}) => (
  <div className="form__item">
    <label htmlFor={id}>
      {Icon && <Icon />}
      <span className="visuallyHidden">{label}</span>
    </label>
    <textarea {...input} placeholder={label} type={type} id={id} />
    {touched && error && (
      <span role="alert" className="form__messageInlineWrap">
        <IconCross />
        <span className="form__messageInline">{message}</span>
      </span>
    )}
  </div>
);

// Search Input
export const renderSearchInput: React.FC<RenderInputProps> = ({
  className,
  label,
  input,
  id,
  type,
}) => (
  <div className={className}>
    <label htmlFor={id}>
      <span className="visuallyHidden">{label}</span>
      <input {...input} placeholder={label} type={type} id={id} />
    </label>
  </div>
);
