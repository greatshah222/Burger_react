import React from 'react';
import '../Layout/Layout.css';

export default function Layout(props) {
  return (
    <>
      <main className='Content'>{props.children}</main>
    </>
  );
}
