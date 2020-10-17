import React, { useEffect } from 'react';
import { Card, Typography, CardContent, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getLatest } from '../Transactions/actions';

const useStyles = makeStyles((theme) => ({
 card: {
  marginTop: '30px',
  marginLeft: '30%',
  paddingLeft: '2%',
  color: 'white',
  width: '40%',
  height: '70px',
  borderRadius: '10px',
  fontWeight: 'bolder'
 },
 cardTypography: {
  margin: '0 5%'
 }
}));

function Transactions() {
 const classes = useStyles();
 const latestTransactions = useSelector(
  (state) => state.transaction.latestTrans
 );
 const { userData, login } = useSelector((state) => state.Auth);
 console.log(latestTransactions);
 const dispatch = useDispatch();

 useEffect(() => {
  console.log('use effect');
  dispatch(getLatest(userData._id));
 }, []);

 return (
  <div style={{ marginTop: '30px' }}>
   <Typography variant="h5" color="secondary" style={{ fontWeight: 'bold' }}>
    Latest Five Transactions
   </Typography>
   <Typography>
    <Box
     className={classes.card}
     display="flex"
     bgcolor="teal"
     alignItems="center"
     justifyContent="left"
    >
     <Typography style={{ fontWeight: 'bold' }}>Description</Typography>
     <Typography
      className={classes.cardTypography}
      style={{ fontWeight: 'bold' }}
     >
      Category
     </Typography>
     <Typography style={{ fontWeight: 'bold' }}>Type</Typography>
     <Typography
      style={{ fontWeight: 'bold' }}
      className={classes.cardTypography}
     >
      Collect
     </Typography>
     <Typography style={{ fontWeight: 'bold' }}> Amount</Typography>
    </Box>
   </Typography>
   {latestTransactions &&
    latestTransactions.map((item) => (
     <Box
      key={item._id}
      className={classes.card}
      display="flex"
      bgcolor={item.transactionType === 'Expense' ? '#f53b57' : '#20bf6b'}
      alignItems="center"
      justifyContent="left"
     >
      <Typography style={{ fontWeight: 'bold' }}>{item.description}</Typography>
      <Typography
       className={classes.cardTypography}
       style={{ fontWeight: 'bold' }}
      >
       {item.category}
      </Typography>
      <Typography style={{ fontWeight: 'bold' }}>
       {item.transactionType}
      </Typography>
      <Typography
       style={{ fontWeight: 'bold' }}
       className={classes.cardTypography}
      >
       {item.moneyType}
      </Typography>
      <Typography style={{ fontWeight: 'bold' }}>
       {item.transactionType === 'Expense' ? '-' : '+'} ₹ {item.amount}
      </Typography>
     </Box>
    ))}
  </div>
 );
}

export default Transactions;
