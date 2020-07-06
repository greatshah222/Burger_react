import React from 'react';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideBar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

export default function SideBar(props) {
  const classShowingSideBar = props.openSideBar ? 'Open' : 'Close';

  return (
    <>
      <Backdrop show={props.openSideBar} hideModal={props.closeSideBar} />
      <div className={`SideBar ${classShowingSideBar}`}>
        <Logo />
        <nav>
          <NavigationItems hideModal={props.closeSideBar} />
        </nav>
      </div>
    </>
  );
}
