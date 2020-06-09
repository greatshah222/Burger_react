import React from 'react';
import '../Layout/Layout.css';

export default function Layout(props) {
  return (
    <>
      <div>ToolBar, sideDrawer, backdrop</div>
      <main className='Content'>{props.children}</main>
    </>
  );
}
