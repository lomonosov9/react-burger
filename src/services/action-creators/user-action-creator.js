import { REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS, 
         LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS,
         PASSWORD_RECOVER, PASSWORD_RECOVER_SUCCESS, PASSWORD_RECOVER_FAILED,
         PASSWORD_RESET, PASSWORD_RESET_FAILED, PASSWORD_RESET_SUCCESS,
         GET_USER, GET_USER_FAILED, GET_USER_SUCCESS,
         UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS,
         LOGOUT_USER, LOGOUT_USER_FAILED, LOGOUT_USER_SUCCESS, } from "../action-types";

export const userActionCreator = {
    //регистрация
    registerUser: () => ({
        type: REGISTER_USER
    }),
    setRegisterUserError: (payload = "") => ({
        type: REGISTER_USER_FAILED,
        payload
    }),
    setRegisterUserData: (payload) => (({
        type: REGISTER_USER_SUCCESS,
        data: payload
    })),

    //логин
    loginUser: () => ({
        type: LOGIN_USER
    }),
    setLoginUserError: (payload = "") => ({
        type: LOGIN_USER_FAILED,
        payload
    }),
    setLoginUserData: (payload) => (({
        type: LOGIN_USER_SUCCESS,
        data: payload
    })),

    //восстановление пароля
    passwordRecover: () => ({
        type: PASSWORD_RECOVER
    }),
    setPasswordRecoverError: (payload = "") => ({
        type: PASSWORD_RECOVER_FAILED,
        payload
    }),
    setPasswordRecoverSuccess: () => (({
        type: PASSWORD_RECOVER_SUCCESS
    })),    

    //сброс пароля
    passwordReset: () => ({
        type: PASSWORD_RESET
    }),
    setPasswordResetError: (payload = "") => ({
        type: PASSWORD_RESET_FAILED,
        payload
    }),
    setPasswordResetSuccess: () => (({
        type: PASSWORD_RESET_SUCCESS
    })),

    //запрос данных пользователя
    getUser: () => ({
        type: GET_USER
    }),
    setGetUserError: (payload = "") => ({
        type: GET_USER_FAILED,
        payload
    }),
    setGetUserData: (payload) => (({
        type: GET_USER_SUCCESS,
        data: payload
    })),
    
    //обновление данных пользователя
    updateUser: () => ({
        type: UPDATE_USER
    }),
    setUpdateUserError: (payload = "") => ({
        type: UPDATE_USER_FAILED,
        payload
    }),
    setUpdateUserData: (payload) => (({
        type: UPDATE_USER_SUCCESS,
        data: payload
    })),

    //выход из системы
    logoutUser: () => ({
        type: LOGOUT_USER
    }),
    setLogoutUserError: (payload = "") => ({
        type: LOGOUT_USER_FAILED,
        payload
    }),
    setLogoutUserSuccess: () => (({
        type: LOGOUT_USER_SUCCESS
    })),
}
