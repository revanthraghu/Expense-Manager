import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import PieChartIcon from '@material-ui/icons/PieChart';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { ExternalLink } from 'react-external-link';
import DescriptionIcon from '@material-ui/icons/Description';
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
 ListItemText,
 MenuItem,
 Button
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { logout } from '../Redux/actions';
import { getAllTransactions } from '../Transactions/actions';
import Pagination from '@material-ui/lab/Pagination';

const StyledTableCell = withStyles((theme) => ({
 head: {
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  textAlign: 'center'
 },
 body: {
  fontSize: 14,
  textAlign: 'center'
 }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
 root: {
  '&:nth-of-type(odd)': {
   backgroundColor: '#7ed6df'
  },
  '&:nth-of-type(even)': {
   backgroundColor: '#82ccdd'
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
  fontSize: 40,
  border: 0
 },
 table: {
  width: '80%',
  margin: '5% 0 0 10%'
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

 const { allTrans: ledgerTransactions, totalPages } = useSelector(
  (state) => state.transaction
 );

 const handleLogout = () => {
  dispatch(logout());
  history.push('/login');
 };

 const [sort, setSort] = useState('desc');

 const [category, setCategory] = useState('all');

 const [page, setPage] = useState(1);

 useEffect(() => {
  dispatch(getAllTransactions(userData['_id'], sort, category, page));
 }, [sort, category]);

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
  dispatch(getAllTransactions(userData['_id'], sort, category, newPage));
 };

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
      <ExternalLink href="https://documenter.getpostman.com/view/11565353/TVRkaoJ7">
       <ListItem button key={'postmanDocs'}>
        <DescriptionIcon className={classes.icon} />
        <ListItemText primary={'Postman Docs'} />
       </ListItem>
      </ExternalLink>
     </List>
    </Drawer>
    <main className={classes.content}>
     <div className={classes.toolbar} />
     <Typography variant="h3" style={{ marginBottom: '30px' }}>
      Ledger
     </Typography>
     <Typography variant="h6" style={{ display: 'inline-block' }}>
      Filter:
     </Typography>
     <Select
      name="category"
      className={classes.category}
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      style={{ margin: '0 50px 0 15px' }}
     >
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="income">Income</MenuItem>
      <MenuItem value="expense">Expense</MenuItem>
     </Select>
     <Typography variant="h6" style={{ display: 'inline-block' }}>
      Sort:
     </Typography>
     <Select
      name="sort"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      style={{ margin: '0 50px 0 15px' }}
     >
      <MenuItem value="desc">Latest first</MenuItem>
      <MenuItem value="asc">Oldest first</MenuItem>
     </Select>
     <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="customized table">
       <TableHead>
        <TableRow>
         <StyledTableCell align="right">Date</StyledTableCell>
         <StyledTableCell align="right">Transaction</StyledTableCell>
         <StyledTableCell align="right">Amount</StyledTableCell>
         <StyledTableCell align="right">Category</StyledTableCell>
         <StyledTableCell>Description</StyledTableCell>
        </TableRow>
       </TableHead>
       <TableBody>
        {ledgerTransactions.map((item) => (
         <StyledTableRow key={item.id}>
          <StyledTableCell align="right">
           {new Date(item.date).toLocaleDateString()}
          </StyledTableCell>
          <StyledTableCell align="right">
           {item.transactionType}
          </StyledTableCell>
          <StyledTableCell align="right">₹ {item.amount}</StyledTableCell>
          <StyledTableCell align="right">{item.category}</StyledTableCell>
          <StyledTableCell component="th" scope="row">
           {item.description}
          </StyledTableCell>
         </StyledTableRow>
        ))}
       </TableBody>
      </Table>
     </TableContainer>
     <Pagination
      count={totalPages}
      page={page}
      onChange={handleChangePage}
      color="primary"
      style={{ width: 'max-content', margin: '30px auto' }}
     />
    </main>
   </div>
  </div>
 );
}
{
 /* <main className={classes.content}>
     <div className={classes.toolbar} />
     <Typography variant="h3" style={{ marginBottom: '30px' }}>
      Ledger
     </Typography>
     <Typography variant="h6" style={{ display: 'inline-block' }}>
      Filter:
     </Typography>
     <Select
      name="category"
      className={classes.category}
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      style={{ margin: '0 50px 0 15px' }}
     >
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="income">Income</MenuItem>
      <MenuItem value="expense">Expense</MenuItem>
     </Select>
     <Typography variant="h6" style={{ display: 'inline-block' }}>
      Sort:
     </Typography>
     <Select
      name="sort"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      style={{ margin: '0 50px 0 15px' }}
     >
      <MenuItem value="desc">Latest first</MenuItem>
      <MenuItem value="asc">Oldest first</MenuItem>
     </Select>
     <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="customized table">
       <TableHead>
        <TableRow>
         <StyledTableCell align="right">Date</StyledTableCell>
         <StyledTableCell align="right">Transaction</StyledTableCell>
         <StyledTableCell align="right">Amount</StyledTableCell>
         <StyledTableCell align="right">Category</StyledTableCell>
         <StyledTableCell>Description</StyledTableCell>
        </TableRow>
       </TableHead>
       <TableBody>
        {ledgerTransactions.map((item) => (
         <StyledTableRow key={item.id}>
          <StyledTableCell align="right">
           {new Date(item.date).toLocaleDateString()}
          </StyledTableCell>
          <StyledTableCell align="right">
           {item.transactionType}
          </StyledTableCell>
          <StyledTableCell align="right">₹ {item.amount}</StyledTableCell>
          <StyledTableCell align="right">{item.category}</StyledTableCell>
          <StyledTableCell component="th" scope="row">
           {item.description}
          </StyledTableCell>
         </StyledTableRow>
        ))}
       </TableBody>
      </Table>
     </TableContainer>
     <Pagination
      count={totalPages}
      page={page}
      onChange={handleChangePage}
      color="primary"
      style={{ width: 'max-content', margin: '30px auto' }}
     />
    </main> */
}

export default Ledger;
