import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

function Checkout(props) {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHandler = () => {
    // we will go to /checkout/contact-data'
    props.history.replace('/checkout/contact-data');
  };
  return (
    <div>
      {props.ings && !props.purchased ? (
        <CheckoutSummary
          ingredients={props.ings}
          onCheckoutContinued={checkoutContinuedHandler}
          onCheckoutCancelled={checkoutCancelledHandler}
        />
      ) : (
        <Redirect to='/' />
      )}

      <Route
        path={props.match.path + '/contact-data'}
        component={ContactData}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
