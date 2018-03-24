/**
 * API 接口
 */


export const HOST = 'http://10.30.90.16:8000/';

export const BASE_URL = HOST +　'api/v1';
/*
 * 通过账号密码登录
 * method: POST 
 * /auth/login/
 */
export const LOGIN_BY_PASSWORD = BASE_URL + '/auth/login';

/**
 * 为一个用户绑定识别码
 * method: POST 
 * /users/3/codes
 */
export const BIND_CONFIRM_CODE = BASE_URL + '/users/';

/**
 * 获取某个住址的所有访问记录
 * method: GET
 * /addresses/1/visits
 */
export const GET_IN_OUT_LOG_BY_ADDRESS = BASE_URL + '/addresses/';

/**
 * 为地址绑定用户并赋予权限和时间段
 * method: POST
 * /addresses/3/users
 */
export const AUTH_PERMISSIONS_TIME_TO_BIND_USER = BASE_URL + '/addresses/';

/**
 * 获取某个住址的所有用户
 * method: GET 
 * /addresses/1/users
 */
export const AUTH_PERMISSION_TIME_TO_BIND_USER = BASE_URL + '/addresses/';

/**
 * 获取某个用户
 * method: GET
 * /users/1
 */
export const GET_USER_BY_ID = BASE_URL + '/users/';

/**
 * 更新绑定权限和时间
 * method: PATCH
 * /users/1/addresses/1
 */
export const UPDATE_PERMISSION_TIME = BASE_URL + '/users/';

/**
 * 获取某个用户在某地址的权限和时间段
 * method: GET
 * /users/1/addresses/1
 */
export const GET_USER_PERMISSION_TIME_BY_ADDRESS = BASE_URL + '/users/';


/**
 * 删除某用户与某地址的绑定
 * method: DEL
 * /users/1/addresses/1
 */
export const DEL_PERMISSION_TIME_BY_ADDRESS = BASE_URL + '/users/';

/**
 * 更新用户
 * method: PATCH
 * /users/1
 */
export const UPDATE_USER = BASE_URL + '/users/';

/**
 * 获取某个用户的所有访问记录
 * method: GET
 * /users/1/visits
 */
export const GET_USER_IN_OUT_LOG = BASE_URL + '/users/';

