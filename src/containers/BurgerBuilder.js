import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControl/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from './../axios-order';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
// price for differrent ingredient
const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 3,
  bacon: 2,
};

class BurgerBuilder extends Component {
  state = {
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0,
    // },
    // we want to fetch our ingredients state from db so set it to null initially
    ingredients: null,
    // base price for burger
    totalPrice: 4,
    // purchasable becomes true once any ingredients has a value of 1
    purchasable: false,
    showModal: false,
    // for spinner
    loading: false,
    error: false,
  };

  componentDidMount = async () => {
    try {
      const ingredients = await axios.get(
        'https://vidly-10b0b.firebaseio.com/ingredients.json'
      );
      await this.setState({
        ingredients: ingredients.data,
      });
      console.log(ingredients.data);
    } catch (error) {
      this.setState({ error: true });
    }
    // await this.setState({
    //   ingredients: ingredients,
    // });
  };
  updatePurchaseState = () => {
    const ingredients = {
      ...this.state.ingredients,
    };
    // again taling the array of just values
    const transformedIngredientsValue = Object.values(ingredients);
    //console.log(transformedIngredientsValue); // calculating the total sum
    const checkForTotalValueInIngredients = transformedIngredientsValue.reduce(
      (acc, cur) => acc + cur
    );
    //console.log(checkForTotalValueInIngredients);
    if (checkForTotalValueInIngredients > 0) {
      this.setState({ purchasable: true });
    } else if (checkForTotalValueInIngredients <= 0) {
      this.setState({ purchasable: false });
    }
    //console.log(this.state.purchasable);
    // if sum = 0 then text
  };
  addIngredientHandler = async (type) => {
    const oldCount = this.state.ingredients[type];
    const updataedCount = oldCount + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updataedCount;
    // increasing the price fo reach added item

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    await this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice,
    });
    this.updatePurchaseState();
  };
  removeIngredientHandler = async (type) => {
    const oldCount = this.state.ingredients[type];
    console.log(oldCount);
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredient = { ...this.state.ingredients };
      updatedIngredient[type] = updatedCount;

      // price
      const priceDeduction = INGREDIENT_PRICES[type];
      // console.log(priceDeduction);
      const oldPrice = this.state.totalPrice;
      // console.log(oldPrice);
      const newPrice = oldPrice - priceDeduction;
      // console.log(newPrice);
      await this.setState({
        ingredients: updatedIngredient,
        totalPrice: newPrice,
      });
    }
    if (oldCount === 0) {
      alert('cannot remove');
    }
    this.updatePurchaseState();
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

    const stateData = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
    };
    // this can be accessesd in the Checkout.js
    this.props.history.push({
      pathname: '/checkout',
      state: stateData,
    });
  };

  render() {
    return (
      <>
        {this.state.ingredients ? (
          <Modal show={this.state.showModal} hideModal={this.hideModalHandler}>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <OrderSummary
                hideModal={this.hideModalHandler}
                continuePurchase={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
              />
            )}
          </Modal>
        ) : null}
        {!this.state.ingredients ? (
          <Spinner />
        ) : (
          <>
            <Burger ingredients={this.state.ingredients} />

            <BuildControls
              purchasable={this.state.purchasable}
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              totalPrice={this.state.totalPrice}
              showModal={this.summaryModalHandler}
            />
          </>
        )}{' '}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder);
