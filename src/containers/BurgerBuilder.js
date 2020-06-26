import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControl/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
// price for differrent ingredient

class BurgerBuilder extends Component {
  state = {
    showModal: false,
    // for spinner
    loading: false,
    error: false,
  };

  // componentDidMount = async () => {
  //   try {
  //     const ingredients = await axios.get(
  //       'https://vidly-10b0b.firebaseio.com/ingredients.json'
  //     );
  //     await this.setState({
  //       ingredients: ingredients.data,
  //     });
  //     console.log(ingredients.data);
  //   } catch (error) {
  //     this.setState({ error: true });
  //   }
  //   // await this.setState({
  //   //   ingredients: ingredients,
  //   // });
  // };
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
    //console.log(checkForTotalValueInIngredients);
    // if (checkForTotalValueInIngredients > 0) {
    //   this.setState({ purchasable: true });
    // } else if (checkForTotalValueInIngredients <= 0) {
    //   this.setState({ purchasable: false });
    // }
    return checkForTotalValueInIngredients;
    //console.log(this.state.purchasable);
    // if sum = 0 then text
  };
  // addIngredientHandler = async (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updataedCount = oldCount + 1;
  //   const updatedIngredient = { ...this.state.ingredients };
  //   updatedIngredient[type] = updataedCount;
  //   // increasing the price fo reach added item

  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   await this.setState({
  //     ingredients: updatedIngredient,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchaseState();
  // };
  // removeIngredientHandler = async (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   console.log(oldCount);
  //   if (oldCount > 0) {
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredient = { ...this.state.ingredients };
  //     updatedIngredient[type] = updatedCount;

  //     // price
  //     const priceDeduction = INGREDIENT_PRICES[type];
  //     // console.log(priceDeduction);
  //     const oldPrice = this.state.totalPrice;
  //     // console.log(oldPrice);
  //     const newPrice = oldPrice - priceDeduction;
  //     // console.log(newPrice);
  //     await this.setState({
  //       ingredients: updatedIngredient,
  //       totalPrice: newPrice,
  //     });
  //   }
  //   if (oldCount === 0) {
  //     alert('cannot remove');
  //   }
  //   this.updatePurchaseState();
  // };
  summaryModalHandler = () => {
    this.setState({ showModal: true });
    console.log('clickec');
  };
  hideModalHandler = () => {
    this.setState({ showModal: false });
    console.log('clickec');
  };
  purchaseContinueHandler = async () => {
    // console.log(this.props);
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   // sending dummy order data since at the present we dont have checckout form
    //   customer: {
    //     name: 'Bishal Shah',
    //     address: {
    //       street: 'hello 123',
    //       zipCode: '88888',
    //       country: 'Nepal',
    //     },
    //     email: 'test@mail.com',
    //   },
    //   deliveryMethod: 'fastest',
    // };
    // alert('thanks');
    // make http request
    // we have already defined the baseUrl in the axios in axios-order.js we simply need to define the route now which will be appended to the baseurl. for the firebase we need to type .json at the end of the endpoint and the name whatever u give here will be created auto
    //   try {
    //     await axios.post('/orders.json', order);
    //     await this.setState({ loading: false, showModal: false });
    //   } catch (error) {
    //     await this.setState({ loading: false, showModal: false });
    //   }
    /*

This is using query Params






     console.log(this.props);
    // passing the ingredients via the search query so it can be accessed by checkout page
    const queryParams = [];
    // it loops over the key property so (salad,bacon,meat and cheese)
    for (let i in this.state.ingredients) {
      queryParams.push(
        // encodeUriComponent basically transfer for examole if there is (abc ABC 123 ) it will make (abc%20ABC%20123) so (if there is space it gets encoded as %20)
        encodeURIComponent(i) +
          '=' +
          // this below line give the value for examploe (salad will give 1 and if there is space it will again change to %20 but it is ireelevant now cause its just a number)
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    // it will be passed as http://localhost:3000/checkout?bacon=0&cheese=1&meat=0&salad=1
    // they are key-pair value and needs to be convertred to string
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      // query search first letter is ?
      search: '?' + queryString,
    });



*/
    /**
     *
     *
     * This is using second way easier
     */

    // const stateData = {
    //   ingredients: this.state.ingredients,
    //   totalPrice: this.state.totalPrice,
    // };
    // now handled by redux

    // this can be accessesd in the Checkout.js
    this.props.history.push({
      pathname: '/checkout',
      // state: stateData,
    });
  };

  render() {
    return (
      <>
        {this.props.ings ? (
          <Modal show={this.state.showModal} hideModal={this.hideModalHandler}>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <OrderSummary
                hideModal={this.hideModalHandler}
                continuePurchase={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                price={this.props.totalPrice}
              />
            )}
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
        )}{' '}
      </>
    );
  }
}
// redux
const mapStateToProps = (state) => {
  // getting the state as ings from the reducer. possible because of connect
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // put the two function for adding and removing the ingredients
    onIngredientAdded: (ingName) => {
      // this function aldo requires the payload that is the name of the ingredient
      return dispatch({
        type: 'ADD_INGREDIENT',
        ingredientName: ingName,
      });
    },
    onIngredientRemoved: (ingName) => {
      // this function aldo requires the payload that is the name of the ingredient
      return dispatch({
        type: 'REMOVE_INGREDIENT',
        ingredientName: ingName,
      });
    },
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
