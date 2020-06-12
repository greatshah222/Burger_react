import React from 'react';
import './ToggleSideBar.css';

export default function ToggleSideBar(props) {
  return (
    <div className='SideBarToggle' onClick={props.openSideBar}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
