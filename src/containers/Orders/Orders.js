import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  async componentDidMount() {
    try {
      const res = await axios.get('/orders.json');
      console.log(res.data);
      await this.setState({
        loading: false,
        orders: res.data,
      });
    } catch (error) {
      await this.setState({
        loading: false,
      });
      console.log(error);
    }
    console.log(this.state.orders);
  }
  render() {
    // let newDoc;
    // if (this.state.orders) {
    //   newDoc = Object.keys(this.state.orders).map(
    //     (value) => this.state.orders[value]
    //   );
    //   console.log(newDoc);
    // } else {
    //   newDoc = null;
    // }
    let orders;
    if (this.state.orders) {
      orders = Object.keys(this.state.orders).map((value) => (
        <Order key={value} order={this.state.orders[value]} />
      ));
    } else {
      orders = null;
    }
    return (
      <div>
        {/* {this.state.orders ? { orders } : null} */}
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders);
