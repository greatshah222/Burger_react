import React from 'react';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideBar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

export default function SideBar(props) {
  console.log(props.openSideBar);
  // for opening and closing of sidebar just toggle the class between open and close in SideBar.css
  const classShowingSideBar = props.openSideBar ? 'Open' : 'Close';
  //
  return (
    <>
      {/* Backdrop needs show to true to appear so we set them to true. if we dont write anything beside show it will be default true */}
      {/* onClick property is already defined in the backdrop we just have to set value there so setting hideModal value will give us the click property */}
      <Backdrop show={props.openSideBar} hideModal={props.closeSideBar} />
      <div className={`SideBar ${classShowingSideBar}`}>
        <Logo />{' '}
        <nav>
          <NavigationItems hideModal={props.closeSideBar} />
        </nav>
      </div>
    </>
  );
}
