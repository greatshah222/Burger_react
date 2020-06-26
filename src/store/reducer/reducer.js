// price for differrent ingredient
const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 3,
  bacon: 2,
};
const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        // here we will get the [] from our action in dispatch and the value will be changed.and also we put [action.ingredientName] cause we only want to update its value
        // for eg if we get bacon bacon:state.ingredient[bacon.value+1]
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
      };
    default:
      return state;
  }
};
