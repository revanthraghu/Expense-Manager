import {
 POST_LOGIN_REQUEST,
 POST_LOGIN_SUCCESS,
 POST_LOGIN_FAILURE,
 POST_REGISTER_REQUEST,
 POST_REGISTER_SUCCESS,
 POST_REGISTER_FAILURE
} from './actionTypes';
import axios from 'axios';

// register requests
export const postRegisterRequest = (payload) => ({
 type: POST_REGISTER_REQUEST,
 payload
});

export const postRegisterSuccess = (payload) => ({
 type: POST_REGISTER_SUCCESS,
 payload
});

export const postRegisterFailure = (payload) => ({
 type: POST_REGISTER_FAILURE,
 payload
});

export const postRegister = (payload) => {
 return (dispatch) => {
  return axios({
   method: 'post',
   url: 'http://localhost:5000/api/register',
   data: payload,
   headers: { 'content-type': 'application/json' }
  })
   .then((res) => dispatch(postRegisterSuccess(res.data)))
   .catch((err) => dispatch(postRegisterFailure(err.response.data)));
 };
};

// login requests
export const postLoginRequest = (payload) => ({
 type: POST_LOGIN_REQUEST,
 payload
});

export const postLoginSuccess = (payload) => ({
 type: POST_LOGIN_SUCCESS,
 payload
});

export const postLoginFailure = (payload) => ({
 type: POST_LOGIN_FAILURE,
 payload
});

export const postLogin = (payload) => (dispatch) => {
 console.log(payload);
 dispatch(postLoginRequest(payload));
 axios({
  method: 'post',
  url: 'http://localhost:5000/api/login',
  headers: { 'content-type': 'application/json' },
  data: payload
 })
  .then((res) => dispatch(postLoginSuccess(res.data)))
  .catch((err) => dispatch(postLoginFailure(err.response.data)));
};
