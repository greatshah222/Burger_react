import React from 'react';
import './Backdrop.css';

export default function Backdrop(props) {
  return props.show ? (
    <div className='Blackdrop' onClick={props.hideModal}></div>
  ) : null;
}
