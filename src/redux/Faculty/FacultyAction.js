import axios from 'axios';
import {
    FACULTY_LOGIN_LODING,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGIN_FAILER
} from './FacultyType';


export const facultyLogin = () => {
    return (dispatch) => {
      dispatch(facultyLoginRequest())
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          // response.data is the users
          const admin = response.data
          dispatch(facultyLoginSuccess(admin))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(facultyLoginFailure(error.message))
        })
    }
  }
  
  export const facultyLoginRequest = () => {
    return {
      type: FACULTY_LOGIN_LODING
    }
  }
  
  export const facultyLoginSuccess = users => {
    return {
      type: FACULTY_LOGIN_SUCCESS,
      payload: users
    }
  }
  
  export const facultyLoginFailure = error => {
    return {
      type: FACULTY_LOGIN_FAILER,
      payload: error
    }
  }
