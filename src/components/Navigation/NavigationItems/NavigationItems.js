import React from 'react';
import './Navigationitems.css';
import NavigationItem from './NavigationItem';

export default function NavigationItems() {
  // we are outsourcing item to other component. we need to pass the actual text, link and if active or not. it accepts children so should be opeing and closing of component
  return (
    <ul className='NavigationItems'>
      <NavigationItem link='/'>Burger Bulider</NavigationItem>
      <NavigationItem link='/auth'>LOGIN</NavigationItem>
      <NavigationItem link='/orders'>My Orders </NavigationItem>
    </ul>
  );
}
