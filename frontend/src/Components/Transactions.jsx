import React from "react";
import { Card, Typography, CardContent, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "3%",
    marginLeft:'30%',
    paddingLeft:'2%',
    color:'white',
    width:'40%',
    height:'70px',
    borderRadius:'10px',
    fontWeight:'bolder'
  },
  cardTypography: {
    margin:'0 5%',
  }
}));

function Transactions() {
  const classes = useStyles();
  const transactions = useSelector((state) => state.transaction.transactions);
  let latestTransactions = transactions
    .filter(
      (i, index) =>
        index < transactions.length && index > transactions.length - 6
    )
    .reverse();
  console.log(latestTransactions);
  return (
    <div>
        
      <Typography variant="h5" color="secondary" style={{ marginTop: "8%", fontWeight:'bold' }}>
        Latest Five Transactions
      </Typography>
      <Typography>
      <Box className={classes.card}
                display="flex"
                bgcolor= 'teal'
                alignItems="center"
                justifyContent="left"
              >
                <Typography style={{fontWeight:'bold'}}>Description</Typography>
                <Typography className = {classes.cardTypography} style={{fontWeight:'bold'}}>Category</Typography>
                <Typography style={{fontWeight:'bold'}}>Type</Typography>
                <Typography style={{fontWeight:'bold'}} className={classes.cardTypography}>Collect</Typography>
                <Typography style={{fontWeight:'bold'}}> Amount</Typography>
              </Box>
      </Typography>
      {transactions &&
        latestTransactions.map((item) => (

              <Box className={classes.card}
                display="flex"
                bgcolor={item.transactionType === 'Expense' ? "#f53b57" : '#20bf6b'}
                alignItems="center"
                justifyContent="left"
              >
                <Typography style={{fontWeight:'bold'}}>{item.description}</Typography>
                <Typography className = {classes.cardTypography} style={{fontWeight:'bold'}}>{item.category}</Typography>
                <Typography style={{fontWeight:'bold'}}>{item.transactionType}</Typography>
                <Typography style={{fontWeight:'bold'}} className={classes.cardTypography}>{item.moneyType}</Typography>
                <Typography style={{fontWeight:'bold'}}>{item.transactionType === 'Expense' ? '-' : '+'} ₹ {item.amount}</Typography>
              </Box>

        ))}
    </div>
  );
}

export default Transactions;
