import React, { useState } from 'react';
import '../Layout/Layout.css';
import Toolbar from '../Navigation/ToolBar/Toolbar';
import SideBar from '../Navigation/SideBar/SideBar';

function Layout(props) {
  const [showSideBar, setshowSideBar] = useState(false);

  const sideBarClosehandler = () => {
    setshowSideBar(false);
  };
  const toggleSideBarHandler = () => {
    setshowSideBar((prevState) => !prevState);
  };

  return (
    <>
      {/* toolbar consist navigation and logo */}
      <Toolbar openSideBar={toggleSideBarHandler} />
      {/* side bar only shown in mobile devices */}
      <SideBar closeSideBar={sideBarClosehandler} openSideBar={showSideBar} />

      <main className='Content'>{props.children}</main>
    </>
  );
}

export default Layout;
