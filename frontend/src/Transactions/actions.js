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

export const saveLatest = payload => ({
  type: LATEST_FIVE,
  payload
})

export const saveAllTrans = payload => ({
  type: ALL_TRANS,
  payload
})

export const getLatest = (id) => (dispatch) => {
  console.log(id)
  return axios.get(`http://localhost:5000/api/transactions/latest?user=${id}`)
  .then(res => dispatch(saveLatest(res.data)))
}

export const getAllTransactions = id => dispatch => {
  return axios.get(`http://localhost:5000/api/transactions?user=${id}&filter=all&sort=desc&page=1`)
  .then(res => dispatch(saveAllTrans(res.data)))
}

export const postTransaction = (payload) => (dispatch) => {
  console.log(payload);
  dispatch(postTransactionRequest(payload));
  axios({
  method: 'post',
  url: 'http://localhost:5000/api/transactions/add',
  headers: { 'content-type': 'application/json' },
  data: payload
 })
 .then(res => dispatch(postTransactionSuccess(res.data)))
  .then(res => dispatch(getLatest(res.data.user_id)))
  .catch(err => dispatch(postTransactionFailure(err)));
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
