import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

export class Checkout extends Component {
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
        {this.props.ings && !this.props.purchased ? (
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutContinued={this.checkoutContinuedHandler}
            onCheckoutCancelled={this.checkoutCancelledHandler}
          />
        ) : (
          <Redirect to='/' />
        )}

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
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

// if  we dont have anything to dispatch we dont have to pass  dispatch in the connect.simmillarly  if we dont need mapStateToProps but need the second one pass the first arg as null
export default connect(mapStateToProps)(Checkout);
