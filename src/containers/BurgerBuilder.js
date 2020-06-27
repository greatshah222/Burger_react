import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControl/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import * as actions from './../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    showModal: false,
  };
  componentDidMount() {
    // loading ingredients from firebase
    this.props.onInitIngredients();
  }

  updatePurchaseState = () => {
    const ingredients = {
      ...this.props.ings,
    };
    // again taling the array of just values
    const transformedIngredientsValue = Object.values(ingredients);
    //console.log(transformedIngredientsValue); // calculating the total sum
    const checkForTotalValueInIngredients = transformedIngredientsValue.reduce(
      (acc, cur) => acc + cur
    );

    return checkForTotalValueInIngredients;
  };

  summaryModalHandler = () => {
    this.setState({ showModal: true });
    console.log('clickec');
  };
  hideModalHandler = () => {
    this.setState({ showModal: false });
    console.log('clickec');
  };
  purchaseContinueHandler = async () => {
    this.props.onInitPurchase();
    // this can be accessesd in the Checkout.js
    this.props.history.push({
      pathname: '/checkout',
      // state: stateData,
    });
  };

  render() {
    console.log(this.props);
    return (
      <>
        {this.props.ings ? (
          <Modal show={this.state.showModal} hideModal={this.hideModalHandler}>
            <OrderSummary
              hideModal={this.hideModalHandler}
              continuePurchase={this.purchaseContinueHandler}
              ingredients={this.props.ings}
              price={this.props.totalPrice}
            />
          </Modal>
        ) : null}
        {!this.props.ings ? (
          <Spinner />
        ) : (
          <>
            <Burger ingredients={this.props.ings} />

            <BuildControls
              purchasable={this.updatePurchaseState()}
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              totalPrice={this.props.totalPrice}
              showModal={this.summaryModalHandler}
            />
          </>
        )}
      </>
    );
  }
}
// redux
const mapStateToProps = (state) => {
  // getting the state as ings from the reducer. possible because of connect
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};
// here we have used action creator so that we  can do async code
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    // for getting ingredients from db
    onInitIngredients: () => dispatch(actions.initIngredients()),
    // after the purchase is complete to direct the user
    onInitPurchase: () => dispatch(actions.purchaseInt()),
  };
};

// EXPLIANED HOW THE CONNECT WORKS BELOW
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder));

/**
 * 
 * 
 * 
 * 
 * Hi!

This is normal JS syntax, applying parameters partially.

It's always useful to look at a simple example:

function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
 
console.log(add(4)(7)(5));   // 16
Or the same in ES6 syntax:

const add = a => b => c => a + b + c;
 
console.log(add(4)(7)(5));   // 16
The output is the same as if you would just have written:

function add(a, b, c) {
 return a + b + c
}
 
console.log(add(4, 7, 5));   // 16
... or (ES6):

const add = (a, b, c) => a + b + c;
But the advantage of the nested version is that you can apply the parameters partially, and you can create composed functions in this way. See these examples:

const add_4 = add(4);
console.log(add_4(7)(5));    // 16
 
const add_4_7 = add_4(7);
console.log(add_4_7(5));     // 16
 */
