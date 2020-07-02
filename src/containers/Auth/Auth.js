import React, { Component } from 'react';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
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
  };

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

  render() {
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
    return (
      <div className={classes.Auth}>
        <form>
          {formData}
          <Button btnType='Button Success'>SUBMIT</Button>
        </form>
      </div>
    );
  }
}
export default Auth;
