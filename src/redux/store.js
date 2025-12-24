import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import countryReducer from './countrySlice';
import coursesReducer from './courseSlice';
import disciplinesReducer from './disciplineSlice';
import undergraduateReducer from './undergraduateSlice';
import postgraduateReducer from './postgraduateSlice';
import shortCourseReducer from './shortcourseSlice';
import degreeTypesReducer from './degreeTypeSlice';
import currenciesReducer from './currencySlice';
import executiveReducer from './executiveSlice';
import wishList from './wishList';
import loginReducer from './loginSlice'; 
import certificateReducer from './certificateSlice';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  user: userReducer,
  country: countryReducer,
  executive: executiveReducer,
  certificate: certificateReducer,
  courses: coursesReducer,
  disciplines: disciplinesReducer,
  undergraduate: undergraduateReducer,
  postgraduate: postgraduateReducer,
  shortcourse: shortCourseReducer,
  degreeTypes: degreeTypesReducer,
  currencies: currenciesReducer,
  wishList: wishList,
  login: loginReducer, 

});
export default configureStore({
  reducer
});
