import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 2,
      cheese: 1,
      meat: 1,
    },
  };
  render() {
    return (
      <>
        <div>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <div>Build Control</div>
      </>
    );
  }
}

export default BurgerBuilder;
