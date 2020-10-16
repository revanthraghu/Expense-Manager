import {DATE, EXPENSE, INCOME, BALANCE} from './actionTypes'

export const getDates = (payload) => ({
    type: DATE,
    payload
})

export const getExpense = (payload) => ({
    type: EXPENSE,
    payload
})

export const getIncome = (payload) => ({
    type: INCOME,
    payload
})

export const getBalance = (payload) => ({
    type:BALANCE,
    payload
})