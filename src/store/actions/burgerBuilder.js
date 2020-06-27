import * as actionTypes from './actionType';
import axios from '../../axios-order';

// action creator for adding and removing ingredient

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

// doing async function this is possible because of thunk

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return async (dispatch) => {
    try {
      const ingredients = await axios.get(
        'https://vidly-10b0b.firebaseio.com/ingredients.json'
      );
      await dispatch(setIngredients(ingredients.data));
      console.log(ingredients.data);
    } catch (error) {
      await dispatch(fetchIngredientsFailed());
    }
  };
};
