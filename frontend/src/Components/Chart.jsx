import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { Doughnut } from "react-chartjs-2";
import { Link, useHistory } from "react-router-dom";
import PieChartIcon from "@material-ui/icons/PieChart";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DescriptionIcon from "@material-ui/icons/Description";
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
} from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { logout } from "../Redux/actions";
import { getDates, getExpense, getIncome } from "../Chart/actions";
import { getAllTransactions } from "../Transactions/actions";
import { ExternalLink } from "react-external-link";

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
    margin: "0 40px 30px 0",
    color: "#B33771",
    fontSize: 40,
  },
  paper: {
    padding: theme.spacing(2),
  },
  user: {
    fontWeight: "bold",
    color: "#212121",
  },
  wallet: {
    backgroundColor: "#34495e",
    color: "#b34822",
    padding: 6,
    borderRadius: "50%",
    fontSize: 40,
  },
  heading: {
    color: "#B33771",
    margin: "8% 0",
    fontSize: "24px",
    fontWeight: "bold",
  },
}));

function Chart() {
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
    dispatch(getAllTransactions(userData._id));
  }, []);

  const transactions = useSelector((state) => state.transaction.allTrans);
  console.log(transactions);

  const date = transactions.map((item) => item.date.slice(0, 10));
  const expense = transactions
    .filter((item) => item.transactionType === "Expense")
    .map((item) => item.amount);
  const income = transactions
    .filter((item) => item.transactionType === "Income")
    .map((item) => item.amount);

  useEffect(() => {
    dispatch(getDates(date));
    dispatch(getExpense(expense));
    dispatch(getIncome(income));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  let expenseCategory = transactions
    .filter((item) => item.transactionType === "Expense")
    .map((item) => item.category);
  let incomeCategory = transactions
    .filter((item) => item.transactionType === "Income")
    .map((item) => item.category);

  let expenseColor = [],
    incomeColor = [];

  const random = () => {
    return Math.floor(Math.random() * 255);
  };

  const randomColor = () => {
    return `rgb(${random()},${random()},${random()})`;
  };

  for (let i = 0; i < expenseCategory.length; i++) {
    expenseColor.push(randomColor());
  }

  for (let i = 0; i < incomeCategory.length; i++) {
    incomeColor.push(randomColor());
  }

  console.log(expenseColor, incomeColor);

  const expenseData = {
    labels: expenseCategory,
    datasets: [
      {
        type: "doughnut",
        label: "Savings (thousands)",
        data: expense,
        backgroundColor: expenseColor,
      },
    ],
  };
  const incomeData = {
    labels: incomeCategory,
    datasets: [
      {
        label: "Income (thousands)",
        data: income,
        backgroundColor: incomeColor,
      },
    ],
  };

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
          <Toolbar
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
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
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AccountBalanceWalletIcon className={classes.wallet} />
                <div
                  style={{
                    display: "flex",
                    margin: "0 15px",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography className={classes.user}>
                    {userData.name}
                    <br />
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: "bolder",
                        width: "max-content",
                        marginLeft: "auto",
                      }}
                    >
                      {userData.balance === 0
                        ? "₹ 0"
                        : userData.balance > 0
                        ? `+ ₹ ${userData.balance}`
                        : `- ₹ ${userData.balance}`}
                    </Typography>
                  </Typography>
                </div>
              </div>
              <IconButton onClick={handleLogout}>
                <PowerSettingsNewIcon
                  style={{ fontSize: 30, color: "#6D214F" }}
                />
              </IconButton>
            </div>
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
          <Divider style={{ marginBottom: "45%" }} />
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
            <ExternalLink href="https://documenter.getpostman.com/view/11565353/TVRkaoJ7">
              <ListItem button key={"postmanDocs"}>
                <DescriptionIcon className={classes.icon} />
                <ListItemText primary={"Postman Docs"} />
              </ListItem>
            </ExternalLink>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{ width: "50%", float: "left" }}>
            <Typography className={classes.heading}>Expense Data</Typography>
            <Doughnut data={expenseData} />
          </div>
          <div style={{ width: "50%", float: "left" }}>
            <Typography className={classes.heading}>Income Data</Typography>
            <Doughnut data={incomeData} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Chart;
