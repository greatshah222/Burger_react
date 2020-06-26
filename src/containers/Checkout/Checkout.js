import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

export class Checkout extends Component {
  // async componentDidMount() {
  //   // if (this.props.location.state) {
  //   //   const ingredients = this.props.location.state.ingredients;
  //   //   const totalPrice = this.props.location.state.totalPrice;
  //   //   await this.setState({
  //   //     ingredients: ingredients,
  //   //     totalPrice: totalPrice,
  //   //   });
  //   // }
  //   // using redux instead of query param to get the state
  // }
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
          ingredients={this.props.ings}
          onCheckoutContinued={this.checkoutContinuedHandler}
          onCheckoutCancelled={this.checkoutCancelledHandler}
        />
        {/* // use match.path in route wheras match.url in links */}
        {/* <Route
          path={this.props.match.path + '/contact-data'}
          //   component={ContactData}
          // this way of rendering component will allow us to pass the state in the <ContactData/>
          render={(props) => (
            // we dont have the history and push cause we are using the rendering method instad od component. so u can pass the props so that it can be accessed
            <ContactData
              ingredients={this.props.ings}
              totalPrice={this.props.totalPrice}
              {...props}
            />
          )}
        /> */}

        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // getting the state as ings from the reducer. possible because of connect
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
// since we dont have anything to dispatch we dont have tp pass dispatch in the connect and simmillarlt if we dont need mapStateToProps but need the second one pass the first arg as null
export default connect(mapStateToProps)(Checkout);
