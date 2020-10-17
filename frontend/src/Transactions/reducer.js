import {
 POST_TRANSACTION_REQUEST,
 POST_TRANSACTION_SUCCESS,
 POST_TRANSACTION_FAILURE,
 GET_TRANSACTIONS_REQUEST,
 GET_TRANSACTIONS_SUCCESS,
 GET_TRANSACTIONS_FAILURE,
 LATEST_FIVE,
 ALL_TRANS
} from './actionTypes';

import { loadData, saveData } from '../localStorage';

export const initialState = {
 isLoading: false,
 isError: false,
 errMsg: '',
 transactions: loadData('expenseManagerTransactions') || [],
 latestTrans: [],
 allTrans: []
};

export default (state = initialState, action) => {
 switch (action.type) {
  case POST_TRANSACTION_REQUEST:
   return {
    ...state,
    isLoading: true,
    isError: false
   };
  case POST_TRANSACTION_SUCCESS:
   let transactionData = [...state.transactions, action.payload];
   console.log(transactionData);
   console.log(action.payload);
   saveData('expenseManagerTransactions', transactionData);
   let updatedBal = loadData('expenseUser');
   updatedBal.balance = action.payload.balance;
   saveData('expenseUser', updatedBal);
   return {
    ...state,
    isLoading: false,
    isError: false,
    transactions: transactionData
   };

  case POST_TRANSACTION_FAILURE:
   return {
    ...state,
    isLoading: false,
    isError: true,
    errMsg: action.payload
   };

  case GET_TRANSACTIONS_REQUEST:
   return {
    ...state,
    isLoading: true,
    isError: false,
    errMsg: ''
   };

  case GET_TRANSACTIONS_SUCCESS:
   saveData('expenseManagerTransactions', action.payload);
   return {
    ...state,
    isLoading: false,
    isError: false,
    errMsg: '',
    transactions: action.payload
   };

  case GET_TRANSACTIONS_FAILURE:
   return {
    ...state,
    isLoading: false,
    isError: true,
    errMsg: action.payload
   };

  case LATEST_FIVE:
   return {
    ...state,
    latestTrans: action.payload
   };

  case ALL_TRANS:
   return {
    ...state,
    allTrans: action.payload
   };

  default:
   return state;
 }
};
