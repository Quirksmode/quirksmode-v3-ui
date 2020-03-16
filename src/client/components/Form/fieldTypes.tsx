import React from 'react';
import IconCross from 'icons/cross.svg';

// Textfield
export const renderInput = ({
  label,
  input,
  id,
  placeholder,
  type,
  Icon,
  message,
  meta: { touched, error, warning }
}) => (
  <div className="form__item">
    <label htmlFor={ id }>
      { Icon && <Icon /> }
      <span className="visuallyHidden">{ label }</span>
    </label>
    <input { ...input } placeholder={ label } type={ type } id={ id } />
    {touched && error
      && (
      <span role="alert" className="form__messageInlineWrap">
        <IconCross />
        <span className="form__messageInline">{message}</span>
      </span>
      )
    }
  </div>
);

// Textarea
export const renderTextarea = ({
  label,
  input,
  id,
  placeholder,
  type,
  Icon,
  message,
  meta: { touched, error, warning }
}) => (
  <div className="form__item">
    <label htmlFor={ id }>
      { Icon && <Icon /> }
      <span className="visuallyHidden">{ label }</span>
    </label>
    <textarea { ...input } placeholder={ label } type={ type } id={ id } />
    {touched && error
      && (
      <span role="alert" className="form__messageInlineWrap">
        <IconCross />
        <span className="form__messageInline">{message}</span>
      </span>
      )
    }
  </div>
);

// Search Input
export const renderSearchInput = ({
  className,
  label,
  input,
  id,
  type,
  placeholder
}) => (
  <div className={ className }>
    <label htmlFor={ id }>
      <span className="visuallyHidden">{ label }</span>
      <input { ...input } placeholder={ label } type={ type } id={ id } />
    </label>
  </div>
);
