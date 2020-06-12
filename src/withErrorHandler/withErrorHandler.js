import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import axios from './../axios-order';

// we can use this component by withErrorHandler(BurgerBuilder) where the props will also be passed . if there is an error it will show the text in the Modal

// also see we are not giving any className to this component
export default function withErrorHandler(WrappedComponent) {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      // the first interceptors is for the request error(means while sending request there might be network issues and here we are also deleting any error if it exists before sending another request)
      axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });
        return req;
      });
      // the second interceptors is for the actual response and if there is an error while handling axios it will get and error. we are using the error in the state to show or not show our modal
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    errorConfirmedHandler = () => {
      // when we click the backdrop error should be sent back to null
      this.setState({ error: null });
    };
    render() {
      return (
        <>
          <Modal show={this.state.error} hideModal={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
}
