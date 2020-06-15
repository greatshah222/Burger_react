import React from 'react';
import './Order.css';

export default function Order(props) {
  const ingredientList = Object.keys(props.order.ingredients).map(
    (ingredient) => (
      <span className='span-ingredient' key={ingredient}>
        {ingredient}: {props.order.ingredients[ingredient]}
      </span>
    )
  );
  console.log(props);

  return (
    <div className='Order'>
      <div className='Order-primary'>
        <h4>Ingredient List </h4>
        <p className='ing-list'>{ingredientList}</p>
        <p>Price: ${props.order.price}</p>
      </div>
    </div>
  );
}
