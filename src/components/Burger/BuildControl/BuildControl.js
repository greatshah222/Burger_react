import React from 'react';

import './BuildControl.css';
export default function BuildControl(props) {
  return (
    <div className='BuildControl'>
      <div className='Label'>{props.label}</div>
      {/* // we have already passed the type form BuildControls so we dont have to do again  */}
      <button onClick={props.removed} className='Less'>
        Less
      </button>
      <button onClick={props.added} className='More'>
        More
      </button>
    </div>
  );
}
