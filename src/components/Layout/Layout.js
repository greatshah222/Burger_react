import React, { Component } from 'react';
import '../Layout/Layout.css';
import Toolbar from '../Navigation/ToolBar/Toolbar';
import SideBar from '../Navigation/SideBar/SideBar';

export class Layout extends Component {
  state = {
    showSideBar: false,
  };
  sideBarClosehandler = () => {
    console.log('clicked');
    this.setState({
      showSideBar: false,
    });
  };
  toggleSideBarHandler = () => {
    this.setState({
      showSideBar: !this.state.showSideBar,
    });
  };
  render() {
    return (
      <>
        {/* toolbar consist navigation and logo */}
        <Toolbar openSideBar={this.toggleSideBarHandler} />
        {/* side bar only shown in mobile devices */}
        <SideBar
          closeSideBar={this.sideBarClosehandler}
          openSideBar={this.state.showSideBar}
        />

        <main className='Content'>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
