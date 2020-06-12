import React from 'react';
import './ToolBar.css';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleSideBar from '../ToggleSideBar/ToggleSideBar';

function Toolbar(props) {
  return (
    <header className='Toolbar'>
      <ToggleSideBar openSideBar={props.openSideBar} />
      <div>
        <Logo />
      </div>
      {/* we are outsourcing the nav item to a component */}
      <nav className='DesktopOnly'>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default Toolbar;
