import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import { postRegister, resetErrorMsg } from '../Redux/actions';
import NavBar from './NavBar';
import Snackbar from '@material-ui/core/Snackbar';
import {useHistory} from 'react-router-dom'

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

// Registration Component
export default function Register() {
 const initialState = {
  fName: '',
  lName: '',
  email: '',
  password: ''
 };

 const classes = useStyles();
 const [registerDetails, setRegisterDetails] = useState(initialState);
 const dispatch = useDispatch();
 const { errMsg } = useSelector((state) => state.Auth);

 const [open, setOpen] = useState(false);
 const history = useHistory()

 const handleChange = (e) => {
  const { name, value } = e.target;
  setRegisterDetails((state) => ({ ...state, [name]: value }));
 };

 useEffect(() => {
  if (errMsg) {
   setOpen(true);
  }
 }, [errMsg, setOpen]);

 const handleRegister = (e) => {
  e.preventDefault();
  const { fName, lName, ...state } = registerDetails;
  let payload = {
   ...state,
   name: `${fName} ${lName}`
  };
  dispatch(postRegister(payload))
  if(errMsg === '') {
    history.push('/login')
  }
 };

 const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
   return;
  }
  setOpen(false);
  dispatch(resetErrorMsg());
 };

 return (
  <>
   <NavBar />
   <form
    onSubmit={handleRegister}
    noValidate
    className={classes.root}
    autoComplete="on"
   >
    <div>
     <TextField
      required={true}
      type="text"
      name="fName"
      start={<EmailIcon />}
      onChange={handleChange}
      value={registerDetails.fName}
      error
      id="standard-basic"
      label="First Name"
     />
    </div>
    {errMsg.includes('name') ? (
     <Snackbar
      style={{ position: 'relative' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
     >
      <div style={{ margin: '20px 0 -25px 0', color: 'red' }}>{errMsg}</div>
     </Snackbar>
    ) : null}
    <div>
     <TextField
      required={true}
      type="text"
      name="lName"
      start={<EmailIcon />}
      onChange={handleChange}
      value={registerDetails.lName}
      error
      id="standard-basic"
      label="Last Name"
     />
    </div>
    {errMsg.includes('name') ? (
     <Snackbar
      style={{ position: 'relative' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
     >
      <div style={{ margin: '20px 0 -25px 0', color: 'red' }}>{errMsg}</div>
     </Snackbar>
    ) : null}
    <div>
     <TextField
      required={true}
      type="email"
      name="email"
      start={<EmailIcon />}
      onChange={handleChange}
      value={registerDetails.email}
      error
      id="standard-basic"
      label="Email"
     />
    </div>
    {errMsg.includes('email') ? (
     <Snackbar
      style={{ position: 'relative' }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
     >
      <div style={{ margin: '20px 0 -25px 0', color: 'red' }}>{errMsg}</div>
     </Snackbar>
    ) : null}
    <div>
     <TextField
      required={true}
      type="password"
      name="password"
      onChange={handleChange}
      value={registerDetails.password}
      error
      id="standard-basic"
      label="Password"
     />
    </div>
    {errMsg.includes('password') ? (
     <Snackbar
      style={{ position: 'relative' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
     >
      <div style={{ margin: '20px 0 -25px 0', color: 'red' }}>{errMsg}</div>
     </Snackbar>
    ) : null}
    <div>
     <Button
      style={{ width: '80%', margin: '30px' }}
      type="submit"
      variant="contained"
      color="secondary"
     >
      Register
     </Button>
    </div>
    <div></div>
   </form>
  </>
 );
}
