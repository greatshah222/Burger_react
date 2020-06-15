import React, { Component } from 'react';
import axios from './../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class ContactData extends Component {
  state = {
    ingredients: null,
    price: '',
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
    totalPrice: 0,
  };

  orderHandler = async (e) => {
    e.preventDefault();

    await this.setState({
      loading: true,
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      // sending dummy order data since at the present we dont have checckout form
      customer: {
        name: 'Bishal Shah',
        address: {
          street: 'hello 123',
          zipCode: '88888',
          country: 'Nepal',
        },
        email: 'test@mail.com',
      },
      deliveryMethod: 'fastest',
    };
    console.log(this.state.props, this.state.ingredients);
    //alert('thanks');
    // make http request
    // we have already defined the baseUrl in the axios in axios-order.js we simply need to define the route now which will be appended to the baseurl. for the firebase we need to type .json at the end of the endpoint and the name whatever u give here will be created auto
    try {
      await axios.post('/orders.json', order);
      await this.setState({ loading: false });
      this.props.history.push('/');
      // we dont have the history and push cause we are using the rendering method instad od component. so u can pass the props so that it can be accessed
    } catch (error) {
      await this.setState({ loading: false });
      this.props.history.push('/');
    }
  };
  render() {
    console.log(this.props);
    return (
      <div className='ContactData'>
        <h4>Enter your Contact data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            <input type='text' name='name' placeholder='Your Name' />
            <input type='email' name='email' placeholder='Your Email' />
            <input type='text' name='street' placeholder='Your Street' />
            <input
              type='text'
              name='postalCode'
              placeholder='Your PostalCode'
            />
            <br />
            <Button btnType='Button Success' clicked={this.orderHandler}>
              Order
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
