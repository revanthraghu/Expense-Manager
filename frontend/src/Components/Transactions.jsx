import React from "react";
import { Card, Typography, CardContent, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "3%",
    marginLeft:'30%',
    paddingLeft:'3%',
    color:'white',
    width:'40%',
    height:'70px',
    borderRadius:'10px'
  },
  cardTypography: {
    margin:'0 5%'
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
        
      <Typography variant="h6" color="secondary" style={{ marginTop: "8%" }}>
        Latest Five Transactions
      </Typography>
      {transactions &&
        latestTransactions.map((item) => (

              <Box className={classes.card}
                display="flex"
                bgcolor={item.transactionType === 'Expense' ? "#f53b57" : '#20bf6b'}
                alignItems="center"
                justifyContent="left"
              >
                <Typography>{item.description}</Typography>
                <Typography className = {classes.cardTypography}>{item.category}</Typography>
                <Typography>{item.transactionType}</Typography>
                <Typography className={classes.cardTypography}>{item.moneyType}</Typography>
                <Typography>{item.transactionType === 'Expense' ? '-' : '+'} ₹ {item.amount}</Typography>
              </Box>

        ))}
    </div>
  );
}

export default Transactions;
