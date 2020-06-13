import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

export default function CheckoutSummary(props) {
  return (
    <div className='CheckoutSummary'>
      <h1>We Hope you enjoy your meal</h1>
      <div className='Burger'>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.onCheckoutContinued} btnType='Button Success'>
        Continue{' '}
      </Button>
      <Button clicked={props.onCheckoutCancelled} btnType='Button Danger'>
        Cancel{' '}
      </Button>
    </div>
  );
}
