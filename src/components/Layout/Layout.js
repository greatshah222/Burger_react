import React from 'react';
import '../Layout/Layout.css';
import Toolbar from '../Navigation/ToolBar/Toolbar';

export default function Layout(props) {
  return (
    <>
      <div>
        <Toolbar />
      </div>
      <main className='Content'>{props.children}</main>
    </>
  );
}
