import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      bacon: 0,
      meat: 0,
    },
    totalPrice: '',
  };
  async componentDidMount() {
    // this is the way by using params
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // for (let param of query.entries()) {
    //   ingredients[param[0]] = param[1] * 1;
    // }
    // this.setState({
    //   ingredients: ingredients,
    // });
    /**
     *
     *
     *
     * Second way easy way
     *
     *
     *
     *
     *`
     */

    const ingredients = this.props.location.state.ingredients;
    const totalPrice = this.props.location.state.totalPrice;
    await this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice,
    });
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    // we will go to /checkout/contact-data'
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutContinued={this.checkoutContinuedHandler}
          onCheckoutCancelled={this.checkoutCancelledHandler}
        />
      </div>
    );
  }
}

export default Checkout;
