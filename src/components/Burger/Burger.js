import React from 'react';
import { BurgerIngredient } from './BurgerIngredients/BurgerIngredient';
import './Burger.css';

export default function Burger(props) {
  //   Object.keys(props.ingredients) gives an array of ingredients(only key of key value pair so it give salad,bacon,cheese,meat not their number) since the original ingredient are object we need to xonvert them to array
  const transformedIngredients = Object.keys(props.ingredients);

  // this is using the bracket notation instead of dot notation to find how many number are there in value of they key in props.ingredients. for example if the value of bacon is 3 it will create a new array with 3 undefined space.
  let t1 = transformedIngredients.map((IngredientName) => {
    return (
      [...Array(props.ingredients[IngredientName])]
        // here after getting the undefined space we map through each undefinedspace and for each undefined space we return the type which is basicaaly the ingredient name and index has to be unique to pass into key we just prefix it with ingredientname so eg salad1. bacon2. the burgerIngredient will get the 4 times salad if the number is passed 4 in state in salad. we are just creating the component here based on the number and type of ingredient.
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
  // if there is no ingredients then we should take an array of Values in BurgerIngredient and calc the sum if sum =0 then say to add ingredient instead of showing image
  const transformedIngredientsValue = Object.values(props.ingredients);
  // calculating the total sum
  const checkForTotalValueInIngredients = transformedIngredientsValue.reduce(
    (acc, cur) => acc + cur
  );
  // if sum = 0 then text
  if (checkForTotalValueInIngredients === 0) {
    t1 = <p>Please add some ingredients</p>;
  }
  // console.log(transformedIngredients);
  // console.log(t1);
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
