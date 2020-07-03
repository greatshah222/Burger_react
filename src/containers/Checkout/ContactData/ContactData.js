import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../UTILS/utils';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter Your Street',
        },
        value: '',

        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter zipCode',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter Your Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter Your email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
      },
    },
  };

  orderHandler = async (e) => {
    e.preventDefault();

    let formData = {};
    Object.keys(this.state.orderForm).map((el) => {
      return (formData[el] = this.state.orderForm[el].value);
    });

    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
      // sending the userId to authenticate
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  // for validation

  // if an event is attaches to the handler it will auto receive the event
  inputChangedHandler = (e, inputID) => {
    const updateOrderForm = { ...this.state.orderForm };
    const singleFormUpdate = { ...updateOrderForm[inputID] };
    singleFormUpdate.value = e.currentTarget.value;

    // here we are justing passing the value and the rules to the checkValidity funciton.
    // value is stored in singleFormUpdate.value whereas rules is stored in the state and can be accessed using  singleFormUpdate.validation

    // BTW singleFormUpdate.valid returns either true or false
    if (singleFormUpdate.validation) {
      // checkValidaity is imported from utils cause it is used in other place as well
      singleFormUpdate.valid = checkValidity(
        singleFormUpdate.value,
        singleFormUpdate.validation
      );
      // it will not show an error unless user has not touched the form input
      singleFormUpdate.touched = true;
    }

    updateOrderForm[inputID] = singleFormUpdate;
    console.log(singleFormUpdate);
    console.log(updateOrderForm);
    this.setState({
      orderForm: updateOrderForm,
    });
  };

  render() {
    const formElement = [];
    // so we are basically looping over this.state.orderForm and first getting the keys name which is street,email etc and then finding the value of that property iand saving to config

    /**
     *
     *
     * config: {elementType: "input", elementConfig: {…},value: ""}
      id: "name"
     *
     *
     *
     *
     *
     *
     *
     *
     */
    Object.keys(this.state.orderForm).map((el) => {
      return formElement.push({
        id: el,
        config: this.state.orderForm[el],
      });
    });
    // console.log(formElement);
    // console.log(this.props);
    return (
      <div className='ContactData'>
        <h4>Enter your Contact data</h4>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {/* // define the InputType here if u dont define it is <input/> by Default */}
            {/* <Input elementType='...' elementConfig='...' value='...' /> */}
            {formElement.map((el) => (
              <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                // error handler
                // we are putting ! cause we want invalid not the valid data
                invalid={!el.config.valid}
                // this will return false if there is no rules
                shouldValidate={el.config.validation}
                // touch the form or not by user
                touched={el.config.touched}
                // change Handler
                changed={(e) => this.inputChangedHandler(e, el.id)}
              />
            ))}
            <br />
            <Button btnType='Button Success'>Order</Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData));
