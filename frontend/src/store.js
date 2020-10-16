import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './Redux/reducer';
import transactionReducer from './Transactions/reducer';
import chartReducer from './Chart/reducer'

const rootReducer = combineReducers({
 Auth: authReducer,
 transaction: transactionReducer,
 chart: chartReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
 rootReducer,
 composeEnhancers(applyMiddleware(thunk))
);
