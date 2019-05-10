import { handleActions } from 'redux-actions'

let team = localStorage.getItem('team') ?
    JSON.parse(localStorage.getItem('team')) : {}

const initialState = {
    team,
}

export default handleActions({
    CURRENT_TEAM: (state, action) => {
        localStorage.setItem('team', JSON.stringify(action.payload))
        return {
            ...state,
            team: action.payload
        }
    }
}, initialState)