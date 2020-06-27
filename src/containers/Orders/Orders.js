import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  async componentDidMount() {
    this.props.onFetchOrder();
  }
  render() {
    let orders = <Spinner />;
    if (this.props.orders && !this.props.loading) {
      orders = Object.keys(this.props.orders).map((el) => (
        <Order key={el} order={this.props.orders[el]} />
      ));
    }
    console.log(this.props);
    return (
      <div>
        {/* {this.props.orders ? { orders } : null} */}
        {orders}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders));
