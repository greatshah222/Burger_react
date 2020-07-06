import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../UTILS/utils';

function Auth(props) {
  const [controls, setControls] = useState({
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
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const { building, authRedirectUrl, OnSetAuthRedirectUrl } = props;

  useEffect(() => {
    if (!building && authRedirectUrl) {
      OnSetAuthRedirectUrl();
    }
  }, [building, authRedirectUrl, OnSetAuthRedirectUrl]);

  const switchAuthModeHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const inputChangedHandler = (e, inputID) => {
    const ctrls = {
      ...controls,
      [inputID]: {
        ...controls[inputID],
        value: e.target.value,

        valid: checkValidity(e.target.value, controls[inputID].validation),
        touched: true,
      },
    };
    setControls(ctrls);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.onAuthInit(controls.email.value, controls.password.value, isSignUp);
  };

  const formElement = [];

  Object.keys(controls).map((el) => {
    return formElement.push({
      id: el,
      config: controls[el],
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
      changed={(e) => inputChangedHandler(e, el.id)}
    />
  ));
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.token) {
    authRedirect = <Redirect to={props.authRedirectUrl} />;
  }
  return (
    <div className={classes.Auth}>
      {errorMessage}
      {authRedirect}

      {props.loading ? (
        <Spinner />
      ) : (
        <form onSubmit={formSubmitHandler}>
          {formData}
          <Button btnType='Button Success'>SUBMIT</Button>
          <Button btnType='Button Danger' clicked={switchAuthModeHandler}>
            {isSignUp ? ' SWITCH TO LOGIN' : ' SWITCH TO  SIGNUP'}
          </Button>
        </form>
      )}
    </div>
  );
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
