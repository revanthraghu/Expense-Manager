import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavBar from './NavBar';
import { postLogin } from '../Redux/actions';
import { Redirect } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
 root: {
  background: 'white',
  width: 307.5,
  borderRadius: '0 0 8px 8px',
  flexGrow: 1,
  marginLeft: '75%',
  '& .MuiTextField-root': {
   margin: theme.spacing(1)
  }
 }
}));

// function TransitionDown(props) {
//  return <Slide {...props} direction="down" />;
// }

export default function Login() {
 const classes = useStyles();
 const [open, setOpen] = useState(false);

 const initialState = {
  email: '',
  password: ''
 };

 const [loginDetails, setLoginDetails] = useState(initialState);

 //  const [transition, setTransition] = React.useState(undefined);
 const { login, errMsg } = useSelector((state) => state.Auth);

 useEffect(() => {
  setOpen(true);
 }, [setOpen, errMsg]);

 const dispatch = useDispatch();

 const handleChange = (e) => {
  const { name, value } = e.target;
  setLoginDetails((state) => ({ ...state, [name]: value }));
 };

 const handleLogin = (e) => {
  e.preventDefault();
  dispatch(postLogin(loginDetails));
 };

 const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
   return;
  }

  setOpen(false);
 };

 return (
  <>
   {login ? (
    <Redirect to="/dashboard" />
   ) : (
    <>
     <NavBar />
     <form
      onSubmit={handleLogin}
      noValidate
      className={classes.root}
      autoComplete="on"
     >
      <div>
       <TextField
        required={true}
        type="email"
        name="email"
        start={<EmailIcon />}
        onChange={handleChange}
        value={loginDetails.email}
        error
        id="standard-basic"
        label="Email"
       />
      </div>
      <div>
       <TextField
        required={true}
        name="password"
        type="password"
        onChange={handleChange}
        value={loginDetails.password}
        error
        id="standard-basic"
        label="Password"
       />
      </div>
      <div>
       <Button
        style={{ width: '80%', margin: '30px' }}
        type="submit"
        variant="contained"
        color="secondary"
       >
        Login
       </Button>
      </div>
      {errMsg !== '' ? (
       <Snackbar
        style={{ position: 'relative' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
       >
        <div style={{ marginTop: '15px', color: 'red' }}>* {errMsg}</div>
       </Snackbar>
      ) : null}
     </form>
    </>
   )}
  </>
 );
}
