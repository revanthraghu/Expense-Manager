import {
 POST_REGISTER_REQUEST,
 POST_REGISTER_SUCCESS,
 POST_REGISTER_FAILURE,
 POST_LOGIN_REQUEST,
 POST_LOGIN_SUCCESS,
 POST_LOGIN_FAILURE,
 RESET_ERROR,
 LOGOUT
} from './actionTypes';
import { loadData, saveData } from '../localStorage';

export const initialState = {
 isLoading: false,
 isError: false,
 userData: loadData('expenseUser') || [],
 errMsg: '',
 login: loadData('expenseManagerAuth') || false
};

export default (state = initialState, action) => {
 switch (action.type) {
  case POST_REGISTER_REQUEST:
   return {
    ...state,
    isLoading: true,
    isError: false,
    errMsg: ''
   };

  case POST_REGISTER_SUCCESS:
   return {
    ...state,
    isLoading: false,
    isError: false,
    errMsg: ''
   };

  case POST_REGISTER_FAILURE:
   return {
    ...state,
    isLoading: false,
    isError: true,
    errMsg: action.payload
   };

  case POST_LOGIN_REQUEST:
   return {
    ...state,
    isLoading: true,
    isError: false,
    errMsg: ''
   };

  case POST_LOGIN_SUCCESS:
   saveData('expenseManagerAuth', true);
   saveData('expenseUser', action.payload);
   return {
    ...state,
    isLoading: false,
    isError: false,
    login: true,
    errMsg: '',
    userData: action.payload
   };

  case POST_LOGIN_FAILURE:
   return {
    ...state,
    isLoading: false,
    isError: true,
    errMsg: action.payload
   };
  case RESET_ERROR:
   return { ...state, errMsg: '' };

  case LOGOUT:
   console.log('logout');
   saveData('expenseManagerAuth', false);
   saveData('expenseUser', []);
   return {
    ...state,
    login: false
   };

  default:
   return state;
 }
};
