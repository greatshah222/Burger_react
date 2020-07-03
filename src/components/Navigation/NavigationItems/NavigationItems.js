import React from 'react';
import './Navigationitems.css';
import NavigationItem from './NavigationItem';
import { connect } from 'react-redux';

function NavigationItems(props) {
  // we are outsourcing item to other component. we need to pass the actual text, link and if active or not. it accepts children so should be opeing and closing of component
  return (
    <ul className='NavigationItems'>
      <NavigationItem link='/'>Burger Bulider</NavigationItem>
      {props.token ? (
        <>
          <NavigationItem link='/orders'>My Orders </NavigationItem>
          <NavigationItem link='/logout'>LOGOUT</NavigationItem>
        </>
      ) : (
        <NavigationItem link='/auth'>LOGIN</NavigationItem>
      )}
    </ul>
  );
}

const mapStateToProps = (state) => {
  // pass only if it has value
  return {
    token: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(NavigationItems);
