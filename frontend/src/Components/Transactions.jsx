import React from 'react'
import { Card, Typography } from '@material-ui/core'
import {useSelector} from 'react-redux'
import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    card: {
        marginTop:'2%'
    }
}))

function Transactions() {
    
    const classes = useStyles()
    const transactions = useSelector(state => state.transaction.transactions)
    let latestTransactions = transactions.filter((i,index) => index < transactions.length && index > transactions.length - 6).reverse()
    console.log(latestTransactions)
    return (
        <div>
            <Typography variant='h6' color='secondary' style={{marginTop:'8%'}}>
                Latest Five Transactions
            </Typography>
            { transactions && transactions.map(item =>
                <Card variant = 'outlined' className={classes.card}>
                    
                </Card>
            )}
        </div>
    )
}

export default Transactions
