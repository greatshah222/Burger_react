import React from 'react';
import './OrderSummary.css';
import Button from '../../UI/Button/Button';
export default function OrderSummary(props) {
  console.log(props);
  // it will be like salad:2, bacon:3 etc

  const ingredientSummary = Object.keys(props.ingredients).map((ingredient) => (
    <li key={ingredient}>
      <span className='span-ingredient'>{ingredient}</span> :{' '}
      {props.ingredients[ingredient]}
    </li>
  ));
  console.log(ingredientSummary);
  return (
    <div>
      <>
        <h3>Total Order Amount: {props.price} €</h3>
        <p>A delicious order with following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to Checkout</p>

        <Button btnType='Button Success' clicked={props.continuePurchase}>
          CONTINUE
        </Button>
        {/* // using the button component not button of html */}
        <Button btnType='Button Danger' clicked={props.hideModal}>
          {' '}
          CANCEL
        </Button>
      </>
    </div>
  );
}
