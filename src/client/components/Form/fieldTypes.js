import React from 'react';
import SVGInline from 'react-svg-inline';
import IconCross from '!!raw-loader!icons/cross.svg';

// Textfield
export const renderInput = ({
  label,
  input,
  id,
  placeholder,
  type,
  icon,
  message,
  meta: { touched, error, warning }
}) => (
  <div className="form__item">
    <label htmlFor={ id }>
      { icon
        && <SVGInline svg={ icon } />
      }
      <span className="visuallyHidden">{ label }</span>
    </label>
    <input { ...input } placeholder={ label } type={ type } id={ id } />
    {touched && error
      && (
      <span role="alert" className="form__messageInlineWrap">
        <SVGInline svg={ IconCross } />
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
  icon,
  message,
  meta: { touched, error, warning }
}) => (
  <div className="form__item">
    <label htmlFor={ id }>
      { icon
        && <SVGInline svg={ icon } />
      }
      <span className="visuallyHidden">{ label }</span>
    </label>
    <textarea { ...input } placeholder={ label } type={ type } id={ id } />
    {touched && error
      && (
      <span role="alert" className="form__messageInlineWrap">
        <SVGInline svg={ IconCross } />
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
