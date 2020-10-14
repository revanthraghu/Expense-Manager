import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import { useHistory } from 'react-router-dom';
import { postRegister } from '../Redux/actions';
import NavBar from './NavBar';
import Snackbar from '@material-ui/core/Snackbar';

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
 const history = useHistory();
 const dispatch = useDispatch();
 const errMsg = useSelector((state) => state.errMsg);
 console.log(errMsg);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setRegisterDetails((state) => ({ ...state, [name]: value }));
 };

 const handleRegister = () => {
  console.log(registerDetails);
  const { fName, lName, ...state } = registerDetails;
  let payload = {
   ...state,
   name: `${fName} ${lName}`
  };
  dispatch(postRegister(payload));
 };

 return (
  <>
   <NavBar />
   <form className={classes.root} noValidate autoComplete="on">
    <div>
     <TextField
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
    <div>
     <TextField
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
    <div>
     <TextField
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
    <div>
     <TextField
      type="password"
      name="password"
      onChange={handleChange}
      value={registerDetails.password}
      error
      id="standard-basic"
      label="Password"
     />
    </div>
    <div>
     <Button
      style={{ width: '80%', margin: '30px' }}
      onClick={handleRegister}
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
 return (
  <>
   <NavBar />
   <form className={classes.root} noValidate autoComplete="off">
    <div>
     <TextField
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
    <div>
     <TextField
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
    <div>
     <TextField
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
    <div>
     <TextField
      name="password"
      onChange={handleChange}
      value={registerDetails.password}
      error
      id="standard-basic"
      label="Password"
     />
    </div>
    <div>
     <Button onClick={handleRegister} variant="contained" color="secondary">
      Register
     </Button>
    </div>
    <div>{errMsg && <div>{errMsg}</div>}</div>
   </form>
  </>
 );
}
