import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import NavBar from './NavBar';
import { postLogin } from '../Redux/actions';
import { Redirect } from 'react-router-dom';

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

export default function Login() {
 const classes = useStyles();

 const initialState = {
  email: '',
  password: ''
 };

 const [loginDetails, setLoginDetails] = useState(initialState);
 const login = useSelector((state) => state.login);
 const dispatch = useDispatch();

 const handleChange = (e) => {
  const { name, value } = e.target;
  setLoginDetails((state) => ({ ...state, [name]: value }));
 };

 const handleLogin = () => {
  dispatch(postLogin(loginDetails));
 };

 return (
  <>
   {login ? (
    <Redirect to="/dashboard" />
   ) : (
    <>
     <NavBar />
     <form className={classes.root} noValidate autoComplete="off">
      <div>
       <TextField
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
        name="password"
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
        onClick={handleLogin}
        variant="contained"
        color="secondary"
       >
        Login
       </Button>
      </div>
     </form>
    </>
   )}
  </>
 );
}
