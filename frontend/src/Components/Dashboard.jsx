import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import PieChartIcon from '@material-ui/icons/PieChart';
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
  TextareaAutosize,
  Grid,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { useDispatch, useSelector } from "react-redux";
import { postTransaction } from "../Transactions/actions";
import { logout } from "../Redux/actions";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Transactions from "./Transactions";
import { Link } from "react-router-dom";
import palette from 'material-palette';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


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
  addTransaction: {
    maxWidth: "50%",
    marginLeft: "25%",
    textAlign: "left",
  },
  transaction: {
    color: "#B33771",
    padding: "1%",
    textAlign:'center'
  },
  description: {
    width: "96%",
    marginLeft: "2%",
    border:"1px solid #22a6b3",
    borderRadius:20,
    marginTop:20,
    paddingTop:20,paddingLeft:20
  },
  paper: {
    padding: theme.spacing(2),
  },
  moneyType: {
    marginTop: "50px",
  },
  submit: {
    background: "#22a6b3",
    color: "white",
    margin: "0 2% 3% 82%",
    '&:hover': {
      background:'#22a6b3',
      filter:'brightness(1.2)'
    }
  },
  user: {
    color:'#B33771',
    marginRight:'1%',
    fontWeight:'bold',
    fontSize:'20px'
  },
  category: {
    padding: "2% 4%",
    marginTop: "8%",
    background: "#22a6b3",
    color: "white",
    fontSize: "15px",
    border: "1px solid #22a6b3",
    borderRadius: "8px",
  },
  calendar: {
    color: palette.primary1Color,
    textColor: palette.alternateTextColor,
    calendarTextColor: palette.textColor,
    selectColor: palette.primary2Color,
    selectTextColor: palette.alternateTextColor,
    calendarYearBackgroundColor: palette.canvasColor,
    headerColor: palette.pickerHeaderColor || palette.primary1Color,
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

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState('hidden')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let initialState = {
    moneyType: "Cash",
    transactionType: "Expense",
    category: "Category",
    amount: "",
    description: "",
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date("2020-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [transactionDetails, setTransactionDetails] = useState(initialState);

  const handleTransaction = (e) => {
    const { name, value } = e.target;
    setTransactionDetails((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    let payload = {
      ...transactionDetails,
      id: uuidv4(),
      date: selectedDate,
    };
    setVisible('block')
    dispatch(postTransaction(payload));
    setTransactionDetails(initialState);
  };

  const handleLogout = () => {
    dispatch(logout);
  };

  const transactions = useSelector((state) => state.transaction.transactions);
  const { userData, login } = useSelector((state) => state.Auth);
  console.log(userData);

  const bal = useSelector(state => state.chart.balance)

  return (
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
          <Link
            to="/dashboard"
            style={{ color: "#B33771", textDecoration: "none" }}
          >
            <ListItem button key={"Dashboard"}>
              <DashboardIcon className={classes.icon} />
              <ListItemText primary={"Dashboard"} />
            </ListItem>
          </Link>
          <Link
            to="/ledger"
            style={{ color: "#B33771", textDecoration: "none" }}
          >
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
        <Card className={classes.addTransaction} variant="outlined">
          <CardContent>
            <Typography
              className={classes.transaction}
              variant="h5"
              gutterBottom
            >
              Add Transaction
            </Typography>
            <Divider />
            {/* <Typography style={{ margin: "2%" }}>Description</Typography> */}

            <TextareaAutosize
              rowsMin={8}
              className={classes.description}
              name="description"
              value={transactionDetails.description}
              onChange={handleTransaction}
              aria-label="maximum height"
              placeholder="Enter description....."
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className={classes.paper}>
                  <select
                    name="category"
                    className={classes.category}
                    value={transactionDetails.category}
                    onChange={handleTransaction}
                  >
                    <option value="Category">Category</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Education">Education</option>
                    <option value="Food">Food</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Haelth">Health</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Living">Living</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Fees">Fees</option>
                    <option value="Others">Others</option>
                  </select>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.paper}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        className={classes.calendar}
                        id="date-picker-dialog"
                        format="mm/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              spacing={6}
              style={{ margin: "2% 0" }}
            >
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
                    control={<Radio style={{color:"#22a6b3"}} />}
                    label="Cash"
                  />
                  <FormControlLabel
                    value="Cheque"
                    control={<Radio style={{color:"#22a6b3"}} />}
                    label="Cheque"
                  />
                  <FormControlLabel
                    value="Credit"
                    control={<Radio style={{color:"#22a6b3"}} />}
                    label="Credit Card"
                  />
                  <FormControlLabel
                    value="Transfer"
                    control={<Radio style={{color:"#22a6b3"}} />}
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
                  label="Enter your amount"
                />
              </Grid>
              <Grid item style={{ marginTop: "2%", marginLeft: "4%" }}>
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
                      control={<Radio style={{color:"#22a6b3"}} />}
                      label="Expense"
                    />
                    <FormControlLabel
                      value="Income"
                      control={<Radio style={{color:"#22a6b3"}} />}
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
        <Alert style={{display: {visible}}} onClose={() => {}}>Transaction Success</Alert>
        {transactions && <Transactions style={{ marginTop: "5%" }} />}
      </main>
    </div>
  );
}
