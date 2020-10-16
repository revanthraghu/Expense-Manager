import {
 POST_TRANSACTION_REQUEST,
 POST_TRANSACTION_SUCCESS,
 POST_TRANSACTION_FAILURE,
 GET_TRANSACTIONS_REQUEST,
 GET_TRANSACTIONS_SUCCESS,
 GET_TRANSACTIONS_FAILURE
} from './actionTypes';

import axios from 'axios';

// post new transaction requests
export const postTransactionRequest = (payload) => ({
 type: POST_TRANSACTION_REQUEST,
 payload
});

export const postTransactionSuccess = (payload) => ({
 type: POST_TRANSACTION_SUCCESS,
 payload
});

export const postTransactionFailure = (payload) => ({
 type: POST_TRANSACTION_FAILURE,
 payload
});

export const postTransaction = (payload) => (dispatch) => {
 dispatch(postTransactionRequest(payload));
 return axios({
  method: 'post',
  url: 'http://localhost:5000/api/transactions/add',
  headers: { 'content-type': 'application/json' },
  data: payload
 })
  .then((res) => dispatch(postTransactionSuccess(res.data)))
  .catch((err) => dispatch(postTransactionFailure(err)));
};

// get all transactions requests
export const getTransactionsRequest = (payload) => ({
 type: GET_TRANSACTIONS_REQUEST,
 payload
});

export const getTransactionsSuccess = (payload) => ({
 type: GET_TRANSACTIONS_SUCCESS,
 payload
});

export const getTransactionsFailure = (payload) => ({
 type: GET_TRANSACTIONS_FAILURE,
 payload
});

export const getTransactions = (payload) => (dispatch) => {
 dispatch(getTransactionsRequest());

 axios
  .get('http://localhost:3000/transactions')
  .then((res) => console.log(res))
  // axios({
  //     method:'get',
  //     url:'http://localhost:5000/api/transactions',
  //     headers: {
  //         "content-type" : "application/json"
  //     }
  // })
  .then((res) => dispatch(getTransactionsSuccess(res)))
  .catch((err) => dispatch(getTransactionsFailure(err)));
};
