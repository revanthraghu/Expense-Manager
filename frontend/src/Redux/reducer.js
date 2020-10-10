import {POST_REGISTER_REQUEST,POST_REGISTER_SUCCESS,POST_REGISTER_FAILURE,POST_LOGIN_REQUEST,POST_LOGIN_SUCCESS,POST_LOGIN_FAILURE} from './actionTypes'
import {loadData,saveData} from './localStorage'

export const initialState = {
    isLoading:false,
    isError:false,
    userData:[],
    login: loadData("expenseManagerAuth") || false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_REGISTER_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false
            }
            
        case POST_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false
            }

        case POST_REGISTER_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        case POST_LOGIN_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false
            }
            
        case POST_LOGIN_SUCCESS:
            saveData('expenseManagerAuth',true)
            return {
                ...state,
                isLoading:false,
                isError:false,
                login:true
            }

        case POST_LOGIN_FAILURE:
            console.log(action.payload);
            return {
                ...state,
                isLoading:false,
                isError:true
            }

        default:
            return state
    }
}