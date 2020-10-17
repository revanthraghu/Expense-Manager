import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PieChartIcon from '@material-ui/icons/PieChart';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
 Drawer,
 AppBar,
 Toolbar,
 List,
 CssBaseline,
 Typography,
 Divider,
 IconButton,
 ListItem,
 ListItemText,
 Card,
 CardContent,
 CardActions,
 Button,
 Grid,
 Box,
 FormControl,
 FormControlLabel,
 Radio,
 RadioGroup,
 TextField
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useDispatch, useSelector } from 'react-redux';
import { postTransaction } from '../Transactions/actions';
import { logout } from '../Redux/actions';
import { ThemeProvider } from '@material-ui/core/styles';
import 'date-fns';
import {
 MuiPickersUtilsProvider,
 KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Transactions from './Transactions';
import { Link, useHistory } from 'react-router-dom';
import palette from 'material-palette';
import { useEffect } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
 root: {
  display: 'flex'
 },
 appBar: {
  background: '#22a6b3',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen
  })
 },
 appBarShift: {
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.enteringScreen
  })
 },
 menuButton: {
  marginRight: 36
 },
 hide: {
  display: 'none'
 },
 drawer: {
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap'
 },
 drawerOpen: {
  width: drawerWidth,
  transition: theme.transitions.create('width', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.enteringScreen
  })
 },
 drawerClose: {
  transition: theme.transitions.create('width', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: theme.spacing(7) + 1,
  [theme.breakpoints.up('sm')]: {
   width: theme.spacing(9) + 1
  }
 },
 toolbar: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(3)
 },
 icon: {
  margin: '0 40px 30px 0',
  color: '#B33771',
  fontSize: 40
 },
 addTransaction: {
  maxWidth: '50%',
  marginLeft: '25%',
  textAlign: 'left'
 },
 transaction: {
  color: '#B33771',
  padding: '1%',
  textAlign: 'center'
 },
 description: {
  width: '100%',
  border: '1px solid #22a6b3',
  borderRadius: 20,
  marginTop: 20,
  '&:focus': {
   outline: 'none'
  },
  '&:empty:before': {
   content: 'attr(data-placeholder)',
   display: 'block',
   color: '#aaa'
  }
 },
 paper: {
  padding: theme.spacing(2)
 },
 moneyType: {
  marginTop: '50px'
 },
 submit: {
  background: '#22a6b3',
  color: 'white',
  margin: '0 2% 3% 82%',
  '&:hover': {
   background: '#22a6b3',
   filter: 'brightness(1.2)'
  }
 },
 user: {
  fontWeight: 'bold',
  color: '#212121'
 },
 category: {
  padding: '2% 4%',
  marginTop: '5px',
  fontSize: '15px',
  marginLeft: '15px',
  background: '#22a6b3',
  color: 'white',
  borderRadius: '6px'
 },
 calendar: {
  color: palette.primary1Color,
  textColor: palette.alternateTextColor,
  calendarTextColor: palette.textColor,
  selectColor: palette.primary2Color,
  selectTextColor: palette.alternateTextColor,
  calendarYearBackgroundColor: palette.canvasColor,
  headerColor: palette.pickerHeaderColor || palette.primary1Color
 },
 wallet: {
  backgroundColor: '#34495e',
  color: '#b34822',
  padding: 6,
  borderRadius: '50%',
  fontSize: 40
 }
}));

export default function Dashboard() {
 const classes = useStyles();
 const theme = useTheme();
 const dispatch = useDispatch();
 const editableDiv = useRef(null);
 const history = useHistory();

 let initialState = {
  moneyType: 'Cash',
  transactionType: 'Expense',
  category: 'Category',
  amount: ''
 };
 const [open, setOpen] = useState(false);
 const [transactionDetails, setTransactionDetails] = useState(initialState);
 const [selectedDate, setSelectedDate] = useState(new Date());
 let userData = JSON.parse(localStorage.getItem('expenseUser'));
 console.log(userData);
 const transactions = useSelector((state) => state.transaction.transactions);

 const handleDrawerOpen = () => {
  setOpen(true);
 };

 const handleDrawerClose = () => {
  setOpen(false);
 };

 const handleDateChange = (date) => {
  setSelectedDate(date);
 };

 const handleTransaction = (e) => {
  const { name, value } = e.target;
  setTransactionDetails((state) => ({ ...state, [name]: value }));
 };

 const handleSubmit = () => {
  let payload = {
   ...transactionDetails,
   user_id: userData['_id'],
   date: selectedDate,
   description: editableDiv.current.textContent.trim()
  };
  dispatch(postTransaction(payload));
  setTransactionDetails(initialState);
  editableDiv.current.textContent = '';
 };

 const handleLogout = () => {
  dispatch(logout());
  history.push('/login');
 };

 return (
  <div className={classes.root}>
   <CssBaseline />
   <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
     [classes.appBarShift]: open
    })}
   >
    <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center' }}>
     <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
       color="inherit"
       aria-label="open drawer"
       onClick={handleDrawerOpen}
       edge="start"
       className={clsx(classes.menuButton, {
        [classes.hide]: open
       })}
      >
       <MenuIcon />
      </IconButton>
      <Typography variant="h4" noWrap>
       Expense Manager
      </Typography>
     </div>
     <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
       style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
       }}
      >
       <AccountBalanceWalletIcon className={classes.wallet} />
       <div
        style={{
         display: 'flex',
         margin: '0 15px',
         flexDirection: 'column',
         justifyContent: 'center'
        }}
       >
        <Typography className={classes.user}>
         {userData.name}
         <br />
         <Typography
          style={{
           color: 'white',
           fontWeight: 'bolder',
           width: 'max-content',
           marginLeft: 'auto'
          }}
         >
          {userData.balance === 0
           ? '₹ 0'
           : userData.balance > 0
           ? `+ ₹ ${userData.balance}`
           : `- ₹ ${userData.balance}`}
         </Typography>
        </Typography>
       </div>
      </div>
      <IconButton onClick={handleLogout}>
       <PowerSettingsNewIcon style={{ fontSize: 30, color: '#6D214F' }} />
      </IconButton>
     </div>
    </Toolbar>
   </AppBar>
   <Drawer
    variant="permanent"
    className={clsx(classes.drawer, {
     [classes.drawerOpen]: open,
     [classes.drawerClose]: !open
    })}
    classes={{
     paper: clsx({
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open
     })
    }}
   >
    <div className={classes.toolbar}>
     <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
     </IconButton>
    </div>
    <Divider style={{ marginBottom: '45%' }} />
    <List>
     <Link to="/dashboard" style={{ color: '#B33771', textDecoration: 'none' }}>
      <ListItem button key={'Dashboard'}>
       <DashboardIcon className={classes.icon} />
       <ListItemText primary={'Dashboard'} />
      </ListItem>
     </Link>
     <Link to="/ledger" style={{ color: '#B33771', textDecoration: 'none' }}>
      <ListItem button key={'Ledger'}>
       <AssessmentIcon className={classes.icon} />
       <ListItemText primary={'Ledger'} />
      </ListItem>
     </Link>
     <Link to="/chart" style={{ color: '#B33771', textDecoration: 'none' }}>
      <ListItem button key={'chart'}>
       <PieChartIcon className={classes.icon} />
       <ListItemText primary={'Report'} />
      </ListItem>
     </Link>
    </List>
   </Drawer>
   <main className={classes.content}>
    <div className={classes.toolbar} />

    <Card className={classes.addTransaction} variant="outlined">
     <CardContent>
      <Typography className={classes.transaction} variant="h5" gutterBottom>
       Add Transaction
      </Typography>
      <Divider />
      <div
       ref={editableDiv}
       className={classes.description}
       style={{ height: '132px', padding: '15px', overflow: 'auto' }}
       data-placeholder="Enter Description..."
       contentEditable
      ></div>
      <Grid container spacing={2}>
       <Grid item xs={6}>
        <Box className={classes.paper}>
         <Select
          name="category"
          className={classes.category}
          value={transactionDetails.category}
          onChange={handleTransaction}
         >
          <MenuItem value="Category">Category</MenuItem>
          <MenuItem value="Salary">Salary</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
          <MenuItem value="Education">Education</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Clothing">Clothing</MenuItem>
          <MenuItem value="Freelancing">Freelancing</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Living">Living</MenuItem>
          <MenuItem value="Transportation">Transportation</MenuItem>
          <MenuItem value="Fees">Fees</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
         </Select>
        </Box>
       </Grid>
       <Grid item xs={6}>
        <Box className={classes.paper}>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
           <ThemeProvider theme={theme}>
            <KeyboardDatePicker
             margin="normal"
             id="date-picker-dialog"
             format="MM/dd/yyyy"
             value={selectedDate}
             onChange={handleDateChange}
             KeyboardButtonProps={{
              'aria-label': 'change date'
             }}
            />
           </ThemeProvider>
          </Grid>
         </MuiPickersUtilsProvider>
        </Box>
       </Grid>
      </Grid>
      <Grid container justify="center" spacing={6} style={{ margin: '2% 0' }}>
       <FormControl component="fieldset">
        <RadioGroup
         aria-label="moneyType"
         name="moneyType"
         value={transactionDetails.moneyType}
         onChange={handleTransaction}
         row
        >
         <FormControlLabel
          value="Cash"
          control={<Radio style={{ color: '#22a6b3' }} />}
          label="Cash"
         />
         <FormControlLabel
          value="Cheque"
          control={<Radio style={{ color: '#22a6b3' }} />}
          label="Cheque"
         />
         <FormControlLabel
          value="Credit"
          control={<Radio style={{ color: '#22a6b3' }} />}
          label="Credit Card"
         />
         <FormControlLabel
          value="Transfer"
          control={<Radio style={{ color: '#22a6b3' }} />}
          label="Transfer"
         />
        </RadioGroup>
       </FormControl>
      </Grid>
      <Grid container justify="center" spacing={2}>
       <Grid item>
        <TextField
         id="standard-basic"
         name="amount"
         value={transactionDetails.amount}
         onChange={handleTransaction}
         type="number"
         label="Amount"
        />
       </Grid>
       <Grid item style={{ marginTop: '2%', marginLeft: '4%' }}>
        <FormControl component="fieldset">
         <RadioGroup
          aria-label="transactionType"
          name="transactionType"
          value={transactionDetails.transactionType}
          onChange={handleTransaction}
          row
         >
          <FormControlLabel
           value="Expense"
           control={<Radio style={{ color: '#22a6b3' }} />}
           label="Expense"
          />
          <FormControlLabel
           value="Income"
           control={<Radio style={{ color: '#22a6b3' }} />}
           label="Income"
          />
         </RadioGroup>
        </FormControl>
       </Grid>
      </Grid>
     </CardContent>
     <CardActions>
      <Button
       variant="contained"
       className={classes.submit}
       onClick={handleSubmit}
      >
       Submit
      </Button>
     </CardActions>
    </Card>
    {transactions && <Transactions style={{ marginTop: '5%' }} />}
   </main>
  </div>
 );
}
