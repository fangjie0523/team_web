import * as ActionsTypes from './ActionTypes'
import { createAction } from 'redux-actions'
//登陆
export const doLoginOk = createAction(ActionsTypes.DO_LOGIN_OK)

export function fetchUser() {
    console.log(1)
}