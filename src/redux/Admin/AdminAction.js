import axios from 'axios';
import {
    ADMIN_LOGIN_LODING,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILER,
} from './AdminType';


export const adminLogin = () => {
    return (dispatch) => {
      dispatch(adminLoginRequest())
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          // response.data is the users
          const admin = response.data
          dispatch(adminLoginSuccess(admin))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(adminLoginFailure(error.message))
        })
    }
  }
  
  export const adminLoginRequest = () => {
    return {
      type: ADMIN_LOGIN_LODING
    }
  }
  
  export const adminLoginSuccess = users => {
    return {
      type: ADMIN_LOGIN_SUCCESS,
      payload: users
    }
  }
  
  export const adminLoginFailure = error => {
    return {
      type: ADMIN_LOGIN_FAILER,
      payload: error
    }
  }