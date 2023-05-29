import { TUser } from "../types/data";
import { 
    REGISTER_USER, 
    REGISTER_USER_FAILED, 
    REGISTER_USER_SUCCESS, 

    LOGIN_USER, 
    LOGIN_USER_FAILED, 
    LOGIN_USER_SUCCESS,

    PASSWORD_RECOVER, 
    PASSWORD_RECOVER_SUCCESS, 
    PASSWORD_RECOVER_FAILED,

    PASSWORD_RESET, 
    PASSWORD_RESET_FAILED, 
    PASSWORD_RESET_SUCCESS,

    GET_USER, 
    GET_USER_FAILED, 
    GET_USER_SUCCESS,


    UPDATE_USER, 
    UPDATE_USER_FAILED, 
    UPDATE_USER_SUCCESS,

    LOGOUT_USER, 
    LOGOUT_USER_FAILED,
    LOGOUT_USER_SUCCESS, 
} from "../action-types";

export type TRegisterUserAction = {
    readonly type: typeof REGISTER_USER;
}

export type TSetRegisterUserErrorAction = {
    readonly type: typeof REGISTER_USER_FAILED;
    readonly payload: string;
}

export type TSetRegisterUserDataAction = {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly data: TUser;
}

export type TLoginUserAction = {
    readonly type: typeof LOGIN_USER;
}

export type TSetLoginUserErrorAction = {
    readonly type: typeof LOGIN_USER_FAILED;
    readonly payload: string;
}

export type TSetLoginUserDataAction = {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly data: TUser;
}

export type TPasswordRecoverAction = {
    readonly type: typeof PASSWORD_RECOVER;
}

export type TSetPasswordRecoverErrorAction = {
    readonly type: typeof PASSWORD_RECOVER_FAILED;
    readonly payload: string;
}

export type TSetPasswordRecoverSuccessAction = {
    readonly type: typeof PASSWORD_RECOVER_SUCCESS;
}

export type TPasswordResetAction = {
    readonly type: typeof PASSWORD_RESET;
}

export type TSetPasswordResetErrorAction = {
    readonly type: typeof PASSWORD_RESET_FAILED;
    readonly payload: string;
}

export type TSetPasswordResetSuccessAction = {
    readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export type TGetUserAction = {
    readonly type: typeof GET_USER;
}

export type TSetGetUserErrorAction = {
    readonly type: typeof GET_USER_FAILED;
    readonly payload: string;
}

export type TSetGetUserDataAction = {
    readonly type: typeof GET_USER_SUCCESS;
    readonly data: TUser;
}

export type TUpdateUserAction = {
    readonly type: typeof UPDATE_USER;
}

export type TSetUpdateUserErrorAction = {
    readonly type: typeof UPDATE_USER_FAILED;
    readonly payload: string;
}

export type TSetUpdateUserDataAction = {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly data: TUser;
}

export type TLogoutUserAction = {
    readonly type: typeof LOGOUT_USER;
}

export type TSetLogoutUserErrorAction = {
    readonly type: typeof LOGOUT_USER_FAILED;
    readonly payload: string;
}

export type TSetLogoutUserSuccessAction = {
    readonly type: typeof LOGOUT_USER_SUCCESS;
}

//объединяем в Union
export type TUserActions = 
| TRegisterUserAction
| TSetRegisterUserErrorAction
| TSetRegisterUserDataAction
| TLoginUserAction
| TSetLoginUserErrorAction
| TSetLoginUserDataAction
| TPasswordRecoverAction
| TSetPasswordRecoverErrorAction
| TSetPasswordRecoverSuccessAction
| TPasswordResetAction
| TSetPasswordResetErrorAction
| TSetPasswordResetSuccessAction
| TGetUserAction
| TSetGetUserErrorAction
| TSetGetUserDataAction
| TUpdateUserAction
| TSetUpdateUserErrorAction
| TSetUpdateUserDataAction
| TLogoutUserAction
| TSetLogoutUserErrorAction
| TSetLogoutUserSuccessAction;

export const userActionCreator = {
    //#region  регистрация
    registerUser: (): TRegisterUserAction => ({
        type: REGISTER_USER
    }),
    setRegisterUserError: (payload = ""): TSetRegisterUserErrorAction => ({
        type: REGISTER_USER_FAILED,
        payload
    }),
    setRegisterUserData: (payload: TUser): TSetRegisterUserDataAction => (({
        type: REGISTER_USER_SUCCESS,
        data: payload
    })),
    //#endregion

    //#region логин
    loginUser: (): TLoginUserAction => ({
        type: LOGIN_USER
    }),
    setLoginUserError: (payload = ""): TSetLoginUserErrorAction => ({
        type: LOGIN_USER_FAILED,
        payload
    }),
    setLoginUserData: (payload: TUser): TSetLoginUserDataAction => (({
        type: LOGIN_USER_SUCCESS,
        data: payload
    })),
    //#endregion

    //#region восстановление пароля
    passwordRecover: (): TPasswordRecoverAction => ({
        type: PASSWORD_RECOVER
    }),
    setPasswordRecoverError: (payload = ""): TSetPasswordRecoverErrorAction => ({
        type: PASSWORD_RECOVER_FAILED,
        payload
    }),
    setPasswordRecoverSuccess: (): TSetPasswordRecoverSuccessAction => (({
        type: PASSWORD_RECOVER_SUCCESS
    })),    
    //#endregion

    //#region сброс пароля
    passwordReset: (): TPasswordResetAction => ({
        type: PASSWORD_RESET
    }),
    setPasswordResetError: (payload = ""): TSetPasswordResetErrorAction => ({
        type: PASSWORD_RESET_FAILED,
        payload
    }),
    setPasswordResetSuccess: (): TSetPasswordResetSuccessAction => (({
        type: PASSWORD_RESET_SUCCESS
    })),
    //#endregion

    //#region запрос данных пользователя
    getUser: (): TGetUserAction => ({
        type: GET_USER
    }),
    setGetUserError: (payload = ""): TSetGetUserErrorAction => ({
        type: GET_USER_FAILED,
        payload
    }),
    setGetUserData: (payload: TUser): TSetGetUserDataAction => (({
        type: GET_USER_SUCCESS,
        data: payload
    })),
    //#endregion
    
    //#region обновление данных пользователя
    updateUser: (): TUpdateUserAction => ({
        type: UPDATE_USER
    }),
    setUpdateUserError: (payload = ""): TSetUpdateUserErrorAction => ({
        type: UPDATE_USER_FAILED,
        payload
    }),
    setUpdateUserData: (payload: TUser): TSetUpdateUserDataAction => (({
        type: UPDATE_USER_SUCCESS,
        data: payload
    })),
    //#endregion

    //#region выход из системы
    logoutUser: (): TLogoutUserAction => ({
        type: LOGOUT_USER
    }),
    setLogoutUserError: (payload = ""): TSetLogoutUserErrorAction => ({
        type: LOGOUT_USER_FAILED,
        payload
    }),
    setLogoutUserSuccess: (): TSetLogoutUserSuccessAction => (({
        type: LOGOUT_USER_SUCCESS
    })),
    //#endregion
}
