import apiUrl from './ApiUrl'

const HOST = apiUrl[process.env.API_ENV || 'production']

//登陆注册
export const ADMIN_REGISTER = HOST + '/admin_register'
export const ADMIN_LOGIN = HOST + '/admin_login'
export const ADD_TEAM = HOST + '/team/add_team'
