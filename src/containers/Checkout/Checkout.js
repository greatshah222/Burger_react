import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { ContactData } from './ContactData/ContactData';

export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
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
    if (this.props.location.state) {
      const ingredients = this.props.location.state.ingredients;
      const totalPrice = this.props.location.state.totalPrice;
      await this.setState({
        ingredients: ingredients,
        totalPrice: totalPrice,
      });
    }
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
        {/* // use match.path in route wheras match.url in links */}
        <Route
          path={this.props.match.path + '/contact-data'}
          //   component={ContactData}
          // this way of rendering component will allow us to pass the state in the <ContactData/>
          render={(props) => (
            // we dont have the history and push cause we are using the rendering method instad od component. so u can pass the props so that it can be accessed
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
