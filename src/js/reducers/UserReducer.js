import { handleActions } from 'redux-actions'

let user = localStorage.getItem('user') ? 
            JSON.parse(localStorage.getItem('user')) : ''

const initialState = {
    user
}

export default handleActions({
    DO_LOGIN_OK: (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload))
        return {
            ...state,
            user: action.payload
        }
    }
}, initialState)