import React from 'react';
import logo from '../../assets/images/burger-logo.png';
import './Logo.css';

export default function Logo() {
  return (
    <div className='Logo'>
      <img src={logo} alt='Logo' />
    </div>
  );
}
