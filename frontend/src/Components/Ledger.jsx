import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import PieChartIcon from '@material-ui/icons/PieChart';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import {
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Paper,
 Drawer,
 AppBar,
 Toolbar,
 List,
 CssBaseline,
 Typography,
 Divider,
 Select,
 IconButton,
 ListItem,
 ListItemText,MenuItem,
 Button
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { logout } from '../Redux/actions';
import { getAllTransactions } from '../Transactions/actions';


const StyledTableCell = withStyles((theme) => ({
 head: {
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white
 },
 body: {
  fontSize: 14
 }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
 root: {
  '&:nth-of-type(odd)': {
   backgroundColor: theme.palette.action.hover
  }
 }
}))(TableRow);

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
 transaction: {
  color: '#f78fb3',
  textAlign: 'left',
  padding: '1%'
 },
 paper: {
  padding: theme.spacing(2)
 },
 user: {
  fontWeight: 'bold',
  color: '#212121'
 },
 wallet: {
  backgroundColor: '#34495e',
  color: '#b34822',
  padding: 6,
  borderRadius: '50%',
  fontSize: 40
 }
}));

function Ledger() {
 const classes = useStyles();
 const theme = useTheme();
 const dispatch = useDispatch();
 const [open, setOpen] = useState(false);

 const handleDrawerOpen = () => {
  setOpen(true);
 };

 const handleDrawerClose = () => {
  setOpen(false);
 };

 const { userData, login } = useSelector((state) => state.Auth);
 const history = useHistory();

 useEffect(() => {
  dispatch((getAllTransactions(userData._id)))
}, [])

const ledgerTransactions = useSelector(state => state.transaction.allTrans)


 const handleLogout = () => {
  dispatch(logout());
  history.push('/login');
 };

 const [sort,setSort] = useState('')

 const [category, setCategory] = useState('all')

 const handleCategoryFilter = (category) => {
  setCategory(category)
 }

 const handleSort = (order) => {
   setSort(order)
 }

 return (
  <div>
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
      <Link to="/dashboard">
       <ListItem button key={'Dashboard'}>
        <DashboardIcon className={classes.icon} />
        <ListItemText primary={'Dashboard'} />
       </ListItem>
      </Link>
      <Link to="/ledger">
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
     <Select
          name="category"
          className={classes.category}
          value={category}
          onChange={handleCategoryFilter}
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
     <Button onClick={() => handleSort('asc')} variant="contained" color="secondary">
        Ascending
      </Button>
      <Button onClick={() => handleSort('desc')} variant="contained" color="secondary">
        Descending
      </Button>
     <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
       <TableHead>
        <TableRow>
         <StyledTableCell>Description</StyledTableCell>
         <StyledTableCell align="right">Category</StyledTableCell>
         <StyledTableCell align="right">Transaction Type</StyledTableCell>
         <StyledTableCell align="right">Amount</StyledTableCell>
         <StyledTableCell align="right">Date</StyledTableCell>
        </TableRow>
       </TableHead>
       <TableBody>
        {ledgerTransactions.map((item) => (
         <StyledTableRow key={item.id}>
          <StyledTableCell component="th" scope="row">
           {item.description}
          </StyledTableCell>
          <StyledTableCell align="right">{item.category}</StyledTableCell>
          <StyledTableCell align="right">{item.moneyType}</StyledTableCell>
          <StyledTableCell align="right">₹ {item.amount}</StyledTableCell>
          <StyledTableCell align="right">{item.date}</StyledTableCell>
         </StyledTableRow>
        ))}
       </TableBody>
      </Table>
     </TableContainer>
    </main>
   </div>
  </div>
 );
}

export default Ledger;
