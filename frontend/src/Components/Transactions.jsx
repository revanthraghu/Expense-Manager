import React, {useEffect} from "react";
import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,Paper, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { getLatest } from "../Transactions/actions";


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
  },
  table: {
    width:'80%',
    marginLeft:'10%'
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    textAlign: "center",
    color:'white'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    width:'60%',
  },
}))(TableRow);


function Transactions() {
  const classes = useStyles();
  const latestTransactions = useSelector((state) => state.transaction.latestTrans);
  const { userData, login } = useSelector((state) => state.Auth);
  console.log(latestTransactions)
  const dispatch = useDispatch()

  useEffect(() => {
     console.log('use effect')
     dispatch(getLatest(userData._id))
  }, [])
  
  return (
    <div>
        
      <Typography variant="h5" color="secondary" style={{ marginTop: "8%", marginBottom:'4%', fontWeight:'bold' }}>
        Latest Five Transactions
      </Typography>

      <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">
                    Transaction Type
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Received by
                  </StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {latestTransactions.map((item) => (
                  <StyledTableRow style={item.transactionType === 'Expense' ? {background:'#b71540'}:{background:'#55efc4'}} key={item.id}>
                    <StyledTableCell style={item.transactionType === 'Expense' ? {color:'white'}:{color:'black'}} component="th" scope="row">
                      {item.description}
                    </StyledTableCell>
                    <StyledTableCell style={item.transactionType === 'Expense' ? {color:'white'}:{color:'black'}} align="right">
                      {item.category}
                    </StyledTableCell>
                    <StyledTableCell style={item.transactionType === 'Expense' ? {color:'white'}:{color:'black'}} align="right">
                      {item.transactionType}
                    </StyledTableCell>
                    <StyledTableCell style={item.transactionType === 'Expense' ? {color:'white'}:{color:'black'}} align="right">
                      {item.moneyType}
                    </StyledTableCell>
                    <StyledTableCell style={item.transactionType === 'Expense' ? {color:'white'}:{color:'black'}} align="right">
                      ₹ {item.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  );
}

export default Transactions;
