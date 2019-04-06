import apiUrl from './ApiUrl'

const HOST = apiUrl[process.env.API_ENV || 'production']

export const ADMIN_REGISTER = HOST + '/team_php/public/index.php/admin_register'
