import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControl/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
// price for differrent ingredient
const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 3,
  bacon: 2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    // base price for burger
    totalPrice: 4,
    // purchasable becomes true once any ingredients has a value of 1
    purchasable: false,
    ShowSummaryModal: false,
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

  render() {
    return (
      <>
        <Modal show={this.state.showModal} hideModal={this.hideModalHandler}>
          <OrderSummary ingredients={this.state.ingredients} />{' '}
        </Modal>

        <Burger ingredients={this.state.ingredients} />

        <BuildControls
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          totalPrice={this.state.totalPrice}
          showModal={this.summaryModalHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
