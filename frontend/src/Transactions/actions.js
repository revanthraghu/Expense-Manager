import {POST_TRANSACTION_REQUEST,POST_TRANSACTION_SUCCESS,POST_TRANSACTION_FAILURE} from './actionTypes'
import axios from 'axios'

export const postTransactionRequest = payload => ({
    type: POST_TRANSACTION_REQUEST,
    payload
})

export const postTransactionSuccess = payload => ({
    type: POST_TRANSACTION_SUCCESS,
    payload
})

export const postTransactionFailure = payload => ({
    type: POST_TRANSACTION_FAILURE,
    payload
})

export const postTransaction = payload => dispatch => {
    dispatch(postTransactionRequest(payload))
    axios({
        method:'post',
        url:'http://localhost:5000/api/transactions',
        headers:{'content-type':'application/json'},
        data:payload
    })
    .then(res => dispatch(postTransactionSuccess(res.data)))
    .catch(err => dispatch(postTransactionFailure(err)))
}