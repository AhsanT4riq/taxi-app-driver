import { Actions, ActionConst } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { Toast } from 'native-base';
import config from '../../../config.js';

export const RIDER_REGISTER_SUCCESS = 'RIDER_REGISTER_SUCCESS';
export const DRIVER_REGISTER_SUCCESS = 'DRIVER_REGISTER_SUCCESS';
export const RIDER_REGISTER_ERROR = 'RIDER_REGISTER_ERROR';
export const DRIVER_REGISTER_ERROR = 'DRIVER_REGISTER_ERROR';
export const REQUEST_REGISTERATION = 'REQUEST_REGISTERATION';
export const REGISTRATION_RESPONSE_RECEIVED = 'REGISTRATION_RESPONSE_RECEIVED';

export function riderRegisterSuccess(data) {
  return {
    type: RIDER_REGISTER_SUCCESS,
    payload: data
  };
}
export function driverRegisterSuccess(data) {
  return {
    type: DRIVER_REGISTER_SUCCESS,
    payload: data
  };
}
export function riderRegisterError(error) {
  return {
    type: RIDER_REGISTER_ERROR,
    payload: error
  };
}
export function driverRegisterError(error) {
  return {
    type: DRIVER_REGISTER_ERROR,
    payload: error
  };
}
export function registerAsync(obj) {
  const userCredentials = obj;
  userCredentials.userType = 'driver';
  userCredentials.phoneNo = `+${userCredentials.callingCode}${
    userCredentials.phoneNo
  }`;
  // userCredentialsFb.profileUrl = state.entrypage.socialLogin.profileUrl;
  return dispatch => {
    dispatch({ type: REQUEST_REGISTERATION });
    fetch(`${config.serverSideUrl}:${config.port}/api/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
        // if (data.success === true && userCredentials.userType === "rider") {
        //   dispatch(riderRegisterSuccess(data));
        //   dispatch(Actions.riderStartupService());
        // }
        if (data.success === true && userCredentials.userType === 'driver') {
          dispatch(driverRegisterSuccess(data));
          dispatch(Actions.documents());
        }
        // if (data.success === false && userCredentials.userType === "rider") {
        //   dispatch(riderRegisterError(data));
        // }
        if (data.success === false && userCredentials.userType === 'driver') {
          dispatch(driverRegisterError(data));
        }
      })
      .catch(e => {
        // alert(e);
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      });
  };
}

//
// Registration using fb
//
export function registerAsyncFb(obj) {
  const userCredentialsFb = obj;
  userCredentialsFb.phoneNo = `+${userCredentialsFb.callingCode}${
    userCredentialsFb.phoneNo
  }`;
  return (dispatch, getState) => {
    const state = getState();
    userCredentialsFb.password = state.entrypage.socialLogin.id;
    if (!userCredentialsFb.message) {
      dispatch({ type: REQUEST_REGISTERATION });
      fetch(`${config.serverSideUrl}:${config.port}/api/users/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentialsFb)
      })
        .then(resp => {
          resp.json().then(data => {
            dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
            if (
              data.success === true &&
              userCredentialsFb.userType === 'rider'
            ) {
              Toast.show({
                text: 'Already Registered as Rider',
                position: 'bottom',
                duration: 1500
              });
            }
            if (
              data.success === true &&
              userCredentialsFb.userType === 'driver'
            ) {
              if (data.data.user.isApproved) {
                dispatch(driverRegisterSuccess(data));
                // dispatch(Actions.driverStartupService());
                dispatch(Actions.documents());
              } else {
                Alert.alert(
                  'Registration Approval',
                  'Your account will be updated in next 24Hrs.'
                );
                dispatch(Actions.login({ type: ActionConst.RESET }));
              }
              // dispatch(driverRegisterSuccess(data));
              // dispatch(Actions.driverStartupService());
            }
            // if (
            //   data.success === false &&
            //   userCredentialsFb.userType === "rider"
            // ) {
            //   if (data.message === "user already exist") {
            //     dispatch(riderRegisterSuccess(data));
            //     dispatch(Actions.riderStartupService());
            //   } else {
            //     dispatch(riderRegisterError(data));
            //   }
            // }
            if (
              data.success === false &&
              userCredentialsFb.userType === 'driver'
            ) {
              if (data.message === 'user already exist') {
                dispatch(driverRegisterSuccess(data));
                dispatch(Actions.driverStartupService());
              } else {
                dispatch(driverRegisterError(data));
              }
            }
          });
        })
        .catch(e => {
          // alert(e);
          dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
        });
    } else {
      dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      if (obj.success === true && obj.data.user.userType === 'rider') {
        Toast.show({
          text: 'Already Registered as Rider',
          position: 'bottom',
          duration: 1500
        });
      }
      if (obj.success === true && obj.data.user.userType === 'driver') {
        dispatch(driverRegisterSuccess(obj));
        dispatch(Actions.driverStartupService());
      }
    }
  };
}
