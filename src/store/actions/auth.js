import * as actionTypes from './actionType';
import axios from 'axios';
import Cookies from 'js-cookie';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  Cookies.set('jwt', 'loggedout', {
    expires: new Date(Date.now() + 4 * 1000),
  });
  Cookies.set('ext', 'loggedout', {
    expires: new Date(Date.now() + 4 * 1000),
  });
  Cookies.set('userId', 'loggedout', {
    expires: new Date(Date.now() + 4 * 1000),
  });
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
// check auth timeout cause the token expires after 1 hour.  we logout user auto after 1 hour
export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

// async code

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
    // here we are not using the base axios cause the path is different.
    // how to authenticate check
    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let _URL =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWYbA7eh-4ToTbWvA2dx7Oe-eDuGMtyKU';
    if (!isSignup) {
      _URL =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWYbA7eh-4ToTbWvA2dx7Oe-eDuGMtyKU';
    }
    try {
      const res = await axios.post(_URL, authData);
      console.log(res);
      const expirationTimeCookie = new Date(
        Date.now() + res.data.expiresIn * 1000
      );
      console.log(expirationTimeCookie.getTime());
      Cookies.set('jwt', res.data.idToken, {
        expires: expirationTimeCookie,
      });
      // saving expiration time
      Cookies.set('ext', expirationTimeCookie, {
        expires: expirationTimeCookie,
      });
      // saving userId
      Cookies.set('userId', res.data.localId, {
        expires: expirationTimeCookie,
      });

      // localId is userId in firebase
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeOut(res.data.expiresIn));
    } catch (error) {
      //   console.log(error.response.data.error.message);
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const setAuthRedirectPath = (url) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    url: url,
  };
};

export const isLoggedIn = () => {
  return (dispatch) => {
    const token = Cookies.get('jwt');
    console.log(token);
    if (!token) {
      return;
    } else {
      const ext = new Date(Cookies.get('ext'));
      const expirationTime = (ext.getTime() - new Date().getTime()) / 1000;

      console.log(expirationTime);
      if (ext > new Date()) {
        const userId = Cookies.get('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeOut(expirationTime));
      } else {
        dispatch(logout());
      }
    }
  };
};
