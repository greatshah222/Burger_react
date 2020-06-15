import React from 'react';
import './Input.css';

export default function Input(props) {
  let inputElement = null;
  // to make dynamic class based on error
  let inputClasses = 'InputElement';
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses = 'InputElement Invalid';
  }
  // to display validation error
  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className='ValidationError '>Please enter the valid value</p>
    );
  }
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((el) => (
            <option key={el.displayValue} value={el.value}>
              {el.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className='Input'>
      <label className='Label'>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}
