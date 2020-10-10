import {POST_LOGIN_REQUEST,POST_LOGIN_SUCCESS,POST_LOGIN_FAILURE} from './actionTypes'

export const initialState = {
    isLoading:false,
    isError:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_LOGIN_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false
            }
            
        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false
            }

        case POST_LOGIN_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true
            }

        default:
            return state
    }
}