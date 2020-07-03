import * as actionTypes from '../actions/actionType';
// price for differrent ingredient
const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 3,
  bacon: 2,
};
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  // this building is for login page. the login page causes the redirect but we will check if there is building then it will not cause redirect
  building: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        // here we will get the [] from our action in dispatch and the value will be changed.and also we put [action.ingredientName] cause we only want to update its value
        // for eg if we get bacon bacon:state.ingredient[bacon.value+1]
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        building: true,
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        // mounting of ingredient from the server
        building: true,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
