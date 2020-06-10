import React from 'react';
import './ToolBar.css';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

function Toolbar(props) {
  return (
    <header className='Toolbar'>
      <div>MENU</div>
      <div>
        <Logo />
      </div>
      {/* we are outsourcing the nav item to a component */}
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default Toolbar;
