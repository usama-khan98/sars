import { combineReducers } from 'redux'
import adminLogin from './Admin/AdminReducer';
import facultyLogin from './Faculty/FacultyReducer';

const rootReducer = combineReducers({
    admin:adminLogin,
    faculty:facultyLogin,
})

export default rootReducer