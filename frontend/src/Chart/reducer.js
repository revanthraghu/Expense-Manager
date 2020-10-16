import {DATE, EXPENSE, INCOME, BALANCE} from './actionTypes'
import {loadData,saveData} from '../localStorage'

const initialState = {
    date:[],
    expense:[],
    income:[],
    balance: loadData("expenseMngBal") || 0
}

export default (state = initialState, action) => {
    switch (action.type) {

    case DATE:
        console.log(action.payload);
        return { 
            ...state,
            date:[...action.payload] 
        }

    case EXPENSE:
        return {
            ...state,
            expense:[...action.payload]
        }

    case INCOME:
        return {
            ...state,
            income:[...action.payload]
        }

    case BALANCE:
        saveData("expenseMngBal",action.payload)
        return {
            ...state,
            balance:action.payload
        }

    default:
        return state
    }
}
