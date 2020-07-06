import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import NotFoundPage from './components/UI/NotFound/NotFoundPage';

function App(props) {
  const [tokenChecked, setTokenChecked] = useState(false);
  const { isLoggedIn } = props;

  useEffect(() => {
    isLoggedIn();
    setTokenChecked(true);
  }, [isLoggedIn]);

  let route = null;
  if (tokenChecked) {
    route = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/not-found' component={NotFoundPage} />

        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/not-found' />
      </Switch>
    );
  }

  if (tokenChecked && props.token) {
    route = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/not-found' component={NotFoundPage} />

        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/not-found' />
      </Switch>
    );
  }
  return (
    <div className='App'>
      <Layout>{route}</Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: () => dispatch(actions.isLoggedIn()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
