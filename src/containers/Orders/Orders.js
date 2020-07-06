import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
  const { token, userId, onFetchOrder } = props;
  useEffect(() => {
    onFetchOrder(token, userId);
  }, [onFetchOrder, token, userId]);

  let orders = <Spinner />;
  if (props.orders && !props.loading) {
    orders = Object.keys(props.orders).map((el) => (
      <Order key={el} order={props.orders[el]} />
    ));
  }
  console.log(props);
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders));
