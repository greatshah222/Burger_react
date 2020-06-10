import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

export default function BuildControls() {
  return (
    <div className='BuildControls'>
      {controls.map((control) => {
        return <BuildControl label={control.label} key={control.label} />;
      })}
    </div>
  );
}
