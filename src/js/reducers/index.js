import { combineReducers } from 'redux'
import userReducer from './UserReducer'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default combineReducers({
    user: userReducer,
    routing: routerReducer
})