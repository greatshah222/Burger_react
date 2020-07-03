import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

export default function NavigationItem(props) {
  return (
    <li className='NavigationItem'>
      <NavLink exact to={props.link} onClick={props.hideModal}>
        {props.children}
      </NavLink>
    </li>
  );
}
