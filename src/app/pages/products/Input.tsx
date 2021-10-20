import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Input = ({
  id,
  className,
  disabled,
  readOnly,
  onChange,
  onClick,
  required,
  inputRef,
  type,
  value,
  defaultValue,
  hasError,
  placeholder,
} : any) => {
  const isTextarea = type === 'textarea';
  const Element = isTextarea ? 'textarea' : 'input';

  const handleChange = (e : any) =>
    disabled || readOnly || !onChange ? null : onChange(e.target.value);

  const randomId = `id-${Math.floor(Math.random() * 9999)}`;

  return (
    <div className={classNames('input', className, hasError && 'hasError')}>
      <Element
        id={id || randomId}
        name={id}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        onClick={onClick}
        readOnly={readOnly}
        placeholder={placeholder || ''}
        ref={inputRef}
        type={isTextarea ? null : type}
        value={value}
        defaultValue={defaultValue}
      />
      {hasError && <div className="error">{hasError}</div>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  hasError: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onblur: PropTypes.func,
  readOnly: PropTypes.bool,
  autofocus: PropTypes.bool,
  type: PropTypes.oneOf([
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'textarea',
    'time',
    'url',
    'week',
    'hidden',
  ]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
