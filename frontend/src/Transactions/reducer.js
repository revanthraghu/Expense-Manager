import {
  POST_TRANSACTION_REQUEST,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_FAILURE,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE
} from "./actionTypes";

import { loadData, saveData } from "../localStorage";

export const initialState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  transactions: loadData("expenseManagerTransactions") || [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POST_TRANSACTION_SUCCESS:
      let transactionData = [...state.transactions, action.payload];
      saveData("expenseManagerTransactions", transactionData);
      return {
        ...state,
        isLoading: false,
        isError: false,
        transactions: transactionData,
      };

    case POST_TRANSACTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
      };

    case GET_TRANSACTIONS_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            errMsg: ''
        }  

    case GET_TRANSACTIONS_SUCCESS:
        saveData("expenseManagerTransactions",action.payload)
        return {
            ...state,
            isLoading:false,
            isError: false,
            errMsg:'',
            transactions: action.payload
        }

    case GET_TRANSACTIONS_FAILURE:
        return {
            ...state,
            isLoading:false,
            isError:true,
            errMsg: action.payload
        }

    default:
      return state;
  }
};
