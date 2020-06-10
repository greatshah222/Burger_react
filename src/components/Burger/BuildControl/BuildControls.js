import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

export default function BuildControls(props) {
  return (
    <div className='BuildControls'>
      <p>
        {' '}
        Current Price: <strong>{props.totalPrice} €</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            // we are using the arrow function just to pass the type to BuildControl
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientRemoved(control.type)}
            label={control.label}
            key={control.label}
          />
        );
      })}
      {/* // button should be disabled when false(not purchasable) */}
      <button
        className='OrderButton'
        disabled={!props.purchasable}
        onClick={props.showModal}
      >
        ORDER NOW
      </button>
    </div>
  );
}
