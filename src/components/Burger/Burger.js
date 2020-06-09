import React from 'react';
import { BurgerIngredient } from './BurgerIngredients/BurgerIngredient';
import './Burger.css';

export default function Burger(props) {
  // ingredients are object but to map them we need to convert them to an array
  //   const transformedIngredients = Object.keys(props.ingredients).map(
  //     (ingredient) => {
  //       // Array (2) will give us an new array with two undefined fields
  //       return [
  //         ...Array(
  //           props.ingredients[ingredient].map((el, i) => {
  //             <BurgerIngredient key={ingredient + i} type={ingredient} />;
  //           })
  //         ),
  //       ];
  //     }
  //   );
  //   Object.keys(props.ingredients) gives an array of ingredients(only key of key value pair so it give salad,bacon,cheese,meat not their number) since the original ingredient are object
  const transformedIngredients = Object.keys(props.ingredients);
  // this is using the bracket notation instead od dot notation to find how many number are there in value of they key in props.ingredients. for example if the value of bacon is 3 it will create a new array with 3 undefined space. the purpose is to just find the length
  const t1 = transformedIngredients.map((IngredientName) => {
    return (
      [...Array(props.ingredients[IngredientName])]
        // here after getting the undefined space we map through each undefinedspace and for each undefined space we return the type which is basicaaly the ingredient name and index has to be unique to pass into key we just prefix it with ingredientname so eg salad1. bacon2. the burgerIngredient will get the 4 times salad if the number is passed 5 in state in salad. we are just creating the component here based on the number and type of ingredient.
        .map((_undefinedSpaceInT1, index) => {
          return (
            <BurgerIngredient
              key={index + IngredientName}
              type={IngredientName}
            />
          );
        })
    );
  });

  console.log(transformedIngredients);
  console.log(t1);
  return (
    <div className='Burger'>
      <h1>Hellp</h1>
      <BurgerIngredient type='bread-top' />
      {/* we will always bread on top and bottom so in between we will dufferent ingredient */}
      {t1}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}
