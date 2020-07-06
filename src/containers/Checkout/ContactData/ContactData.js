import React, { useState } from 'react';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../UTILS/utils';

function ContactData(props) {
  const [orderForm, setorderForm] = useState({
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
  });

  const orderHandler = async (e) => {
    e.preventDefault();

    let formData = {};
    Object.keys(orderForm).map((el) => {
      return (formData[el] = orderForm[el].value);
    });

    const order = {
      ingredients: props.ings,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (e, inputID) => {
    const updateOrderForm = { ...orderForm };
    const singleFormUpdate = { ...updateOrderForm[inputID] };
    singleFormUpdate.value = e.currentTarget.value;

    if (singleFormUpdate.validation) {
      singleFormUpdate.valid = checkValidity(
        singleFormUpdate.value,
        singleFormUpdate.validation
      );

      singleFormUpdate.touched = true;
    }

    updateOrderForm[inputID] = singleFormUpdate;

    setorderForm(updateOrderForm);
  };

  const formElement = [];

  Object.keys(orderForm).map((el) => {
    return formElement.push({
      id: el,
      config: orderForm[el],
    });
  });

  return (
    <div className='ContactData'>
      <h4>Enter your Contact data</h4>
      {props.loading ? (
        <Spinner />
      ) : (
        <form onSubmit={orderHandler}>
          {formElement.map((el) => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
              changed={(e) => inputChangedHandler(e, el.id)}
            />
          ))}
          <br />
          <Button btnType='Button Success'>Order</Button>
        </form>
      )}
    </div>
  );
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
