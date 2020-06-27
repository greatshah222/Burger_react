import * as actionTypes from '../actions/actionType';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      // we will be passing orderData and id so before passing them in the orders array we need to merge them that is why we have newOrder so finally in the newOrder we will have orderData and then in the new property we will be saving orderId from the action as id in newOrder object
      const mergedOrderData = { ...action.orderData, id: action.orderId };
      return {
        ...state,
        loading: false,
        orders: [...state.orders, mergedOrderData],
        purchased: true,
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    // just for switching loading
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    // for redirecting user after success
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
