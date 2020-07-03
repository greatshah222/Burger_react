import React, { Component } from 'react';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'YOUR EMAIL',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'YOUR PASSWORD',
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: false,
  };

  componentDidMount() {
    //   if we are not building the burger then we will be redirected to / already specified on OnSetAuthRedirectUrl
    if (!this.props.building && this.props.authRedirectUrl) {
      this.props.OnSetAuthRedirectUrl();
    }
  }
  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  // change from signin to login
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };
  inputChangedHandler = (e, inputID) => {
    //
    /* here
    
    [inputID]: {...this.state.controls[inputID]
        is like controls[inputID]:{...this.state.controls[inputID]}


        we have to write like this 
        {...this.state.controls[inputID]
            cause 
            { this will be invalid syntax but literal meaning is same}
            controls[inputID]:{...this.state.controls[inputID]}



        */
    const controls = {
      ...this.state.controls,
      [inputID]: {
        ...this.state.controls[inputID],
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.controls[inputID].validation
        ),
        touched: true,
      },
    };
    this.setState({
      controls,
    });
  };
  formSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onAuthInit(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  render() {
    console.log(this.state.isSignUp);
    const formElement = [];

    Object.keys(this.state.controls).map((el) => {
      return formElement.push({
        id: el,
        config: this.state.controls[el],
      });
    });
    const formData = formElement.map((el) => (
      <Input
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        touched={el.config.touched}
        changed={(e) => this.inputChangedHandler(e, el.id)}
      />
    ));
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.token) {
      authRedirect = <Redirect to={this.props.authRedirectUrl} />;
    }
    return (
      <div className={classes.Auth}>
        {errorMessage}
        {authRedirect}

        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.formSubmitHandler}>
            {formData}
            <Button btnType='Button Success'>SUBMIT</Button>
            <Button
              btnType='Button Danger'
              clicked={this.switchAuthModeHandler}
            >
              {this.state.isSignUp ? ' SWITCH TO LOGIN' : ' SWITCH TO  SIGNUP'}
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectUrl: state.auth.authRedirectUrl,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthInit: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    OnSetAuthRedirectUrl: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
