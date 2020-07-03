import * as actionTypes from './actionType';
import axios from '../../axios-order';
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

// just for switching loading
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  // possible cause of thunk

  // we have already defined the baseUrl in the axios in axios-order.js we simply need to define the route now which will be appended to the baseurl. for the firebase we need to type .json at the end of the endpoint and the name whatever u give here will be created auto

  return async (dispatch) => {
    dispatch(purchaseBurgerStart());
    try {
      const res = await axios.post('/orders.json?auth=' + token, orderData);

      // pass id and orderData
      await dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    } catch (error) {
      await dispatch(purchaseBurgerFail(error));
      console.log(error);
    }
  };
};

// AFTER THE BURGER IS PURCHASED
export const purchaseInt = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

// FOR PURCHASING BURGER

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders,
  };
};
export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error,
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};
export const fetchOrders = (token, userId) => {
  return async (dispatch) => {
    dispatch(fetchOrdersStart());
    try {
      // orderBy means it will fetch to result which matches the userId . these are firebase method
      // adding login token
      const res = await axios.get(
        '/orders.json?auth=' +
          token +
          '&orderBy="userId"&equalTo="' +
          userId +
          '"'
      );
      await dispatch(fetchOrdersSuccess(res.data));
      console.log(res.data);
    } catch (error) {
      await dispatch(fetchOrdersFail(error));
    }
  };
};
