import {DATE, EXPENSE, INCOME} from './actionTypes'

const initialState = {
    date:[],
    expense:[],
    income:[]
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

    default:
        return state
    }
}
