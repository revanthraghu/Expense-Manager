import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
 root: {
  flexGrow: 1,
  width: '307.5px',
  marginLeft: '75%',
  background: 'white',
  borderRadius: '8px 8px 0 0'
 }
});

// NavBar
export default function NavBar() {
 const classes = useStyles();
 const history = useHistory();
 const initialRegLog = history.location.pathname;
 const [regLog, setRegLog] = useState(initialRegLog);

 const handleChange = (e, newregLog) => {
  setRegLog(newregLog);
  history.push(newregLog);
 };
 return (
  <Paper className={classes.root}>
   <Tabs
    value={regLog}
    onChange={handleChange}
    variant="fullWidth"
    indicatorColor="secondary"
    textColor="secondary"
    aria-label="icon label tabs example"
   >
    <Tab icon={<HomeIcon />} value="/" label="Register" />
    <Tab icon={<LockOpenIcon />} value="/login" label="Login" />
   </Tabs>
  </Paper>
 );
}
