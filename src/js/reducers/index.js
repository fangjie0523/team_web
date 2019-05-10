import { combineReducers } from 'redux'
import userReducer from './UserReducer'
import teamReducer from './TeamReducer'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default combineReducers({
    user: userReducer,
    team: teamReducer,
    routing: routerReducer
})