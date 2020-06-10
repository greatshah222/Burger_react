import React from 'react';
import './Button.css';

function Button(props) {
  // here we are making the seperate component for burron so that they can be reused again . the first classname is button wheras second classname depends on props.btnType. in our css file we have two btn type succes or danger {('Button', props.btnType)}
  return (
    <button className={props.btnType} onClick={props.clicked}>
      {props.children}
    </button>
  );
}

export default Button;
