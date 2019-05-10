import apiUrl from './ApiUrl'

const HOST = apiUrl[process.env.API_ENV || 'production']

//登陆注册
export const ADMIN_REGISTER = HOST + '/admin_register'
export const ADMIN_LOGIN = HOST + '/admin_login'
export const ADMIN_UPDATE_PW = HOST + '/admin_update_pw' //用户知道旧密码
export const ADMIN_FORGET_PW = HOST + '/admin_forget_pw' //用户忘记旧密码
export const ADMIN_GET_QUESTION = HOST + '/admin_get_question' //获取用户密保问题

//维护个人信息
export const UPDATE_USER_INFO = HOST + '/user/update_user_info'
export const GET_USER_INFO = HOST + '/user/get_user_info'

//创建球队
export const ADD_TEAM = HOST + '/team/add_team'

//加入球队
export const GET_TEAM_LIST_BY_FUZZY = HOST + '/team/get_team_list_by_fuzzy' //模糊查询球队
export const ADD_APPLY = HOST + '/apply/add_apply' //提交申请

//获取球队列表
export const GET_TEAM_LIST = HOST + '/team/get_team_list'

//编辑球队信息
export const UPDATE_TEAM = HOST + '/team/update_team'

//获取球员列表
export const GET_MEMBER_LIST = HOST + '/team/get_member_list'

//公告
export const GET_NOTICE_LIST = HOST + '/notice/get_notice_list'
export const ADD_NOTICE = HOST + '/notice/add_notice'
export const UPDATE_NOTICE = HOST + '/notice/update_notice'
export const DELETE_NOTICE = HOST +'/notice/delete_notice'

//荣誉
export const GET_HONOR_LIST = HOST + '/honor/get_honor_list'
export const ADD_HONOR = HOST + '/honor/add_honor'
export const UPDATE_HONOR = HOST + '/honor/update_honor'
export const DELETE_HONOR = HOST + '/honor/delete_honor'

//申请审批
export const UPDATE_APPLY = HOST + '/apply/update_apply' //申请审批
export const GET_APPLY_LIST = HOST + '/apply/get_apply_list'

//赛程
export const GET_MATCH_LIST = HOST + '/match/get_match_list'
export const ADD_MATCH = HOST + '/match/add_match'
export const DELETE_MATCH = HOST + '/match/delete_match'



