import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import {Link} from 'react-router-dom'
import PieChartIcon from '@material-ui/icons/PieChart';

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
  IconButton,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssessmentIcon from "@material-ui/icons/Assessment";
import {logout} from '../Redux/actions'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "#22a6b3",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    margin: '0 40px 30px 0',
    color: "#B33771",
    fontSize:40
  },
  transaction: {
    color: "#f78fb3",
    textAlign: "left",
    padding: "1%",
  },
  paper: {
    padding: theme.spacing(2),
  },
  user: {
    color:'#B33771',
    marginRight:'1%',
    fontWeight:'bold',
    fontSize:'20px'
  },
  wallet: {
    color:'#d35400',
    fontSize:40,
    backgroundColor:'#34495e',
    height:40,
    width:40,
    borderRadius:20,
    padding:5,
    marginLeft:'55%'
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
  };  const transactions = useSelector((state) => state.transaction.transactions);
  let ledgerTransactions = transactions.reverse();
  const {userData,login} = useSelector(state => state.Auth)
  console.log(userData);

  const handleLogout = () => {
    dispatch(logout)
  }

  const bal = useSelector(state => state.chart.balance)

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" noWrap>
              Expense Manager
            </Typography>
            <AccountBalanceWalletIcon className={classes.wallet}/>
            <Typography className={classes.user}>
            {userData.name}
            <br/>
            <Typography style={{color:'white',fontWeight:'bolder'}}>{bal === 0 ? 0 : bal > 0 ? `+ ₹ ${bal}`: `- ₹ ${bal}`}</Typography>
            </Typography>
            <PowerSettingsNewIcon style={{fontSize:30, color:'#6D214F'}} onClick={handleLogout} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider style={{marginBottom:'45%'}} />
          <List>
            <Link to="/dashboard">
              <ListItem button key={"Dashboard"}>
                <DashboardIcon className={classes.icon} />
                <ListItemText primary={"Dashboard"} />
              </ListItem>
            </Link>
            <Link to="/ledger">
              <ListItem button key={"Ledger"}>
                <AssessmentIcon className={classes.icon} />
                <ListItemText primary={"Ledger"} />
              </ListItem>
            </Link>
            <Link
            to="/chart"
            style={{ color: "#B33771", textDecoration: "none" }}
          >
            <ListItem button key={"chart"}>
              <PieChartIcon className={classes.icon} />
              <ListItemText primary={"Report"} />
            </ListItem>
          </Link>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <TableContainer  component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead >
                <TableRow >
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">
                    Transaction Type
                  </StyledTableCell>
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
                    <StyledTableCell align="right">
                      {item.category}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.moneyType}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      ₹ {item.amount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.date}
                    </StyledTableCell>
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
