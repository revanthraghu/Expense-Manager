import {DATE, EXPENSE, INCOME} from './actionTypes'

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
