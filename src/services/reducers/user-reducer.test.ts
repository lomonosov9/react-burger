import { TUserActions, userActionCreator } from "../action-creators"
import { TUserState, user, initialUserState } from "./user-reducer"
import { TUser } from "../types/data"

describe('user reducer', () => {

    const sourceUser = {
        name: "lomonosov9",
        email: "lomonosov9@yandex.ru"
    };

    const state: TUserState = {
        ...initialUserState,

        user: sourceUser,
        isAuthorized: true,

        dataRequest: true,
        dataFailed: false,
        errorMessage: "",

        passwordRecoverRequest: false,
        passwordRecoverFailed: false,
        passwordRecoverSuccess: false,

        passwordResetRequest: false,
        passwordResetFailed: false,
        passwordResetSuccess: false
    }

    it('should return the initial state on empty action', () => {
        expect(user(undefined, {} as TUserActions)).toEqual(initialUserState);
    })

    //#region  регистрация
    it('should handle REGISTER_USER', () => {
        const res = user(initialUserState, userActionCreator.registerUser());
        expect(res).toEqual({
            ...initialUserState,
            dataRequest: true,
            dataFailed: false,
            errorMessage: ""
        })
    })

    it('should handle REGISTER_USER_FAILED', () => {
        const res = user(state, userActionCreator.setRegisterUserError("Ошибка регистрации"));
        expect(res).toEqual({
            ...state,
            dataFailed: true,
            errorMessage: "Ошибка регистрации",
            user: initialUserState.user,
            isAuthorized: false,
            dataRequest: false
        })
    })

    it('should handle REGISTER_USER_SUCCESS', () => {
        const res = user(state, userActionCreator.setRegisterUserData({ user: sourceUser }));
        expect(res).toEqual({
            ...state,
            user: sourceUser,
            isAuthorized: true,
            dataRequest: false
        })
    })
    //#endregion

    //#region  авторизация
    it('should handle LOGIN_USER', () => {
        const res = user(initialUserState, userActionCreator.loginUser());
        expect(res).toEqual({
            ...initialUserState,
            dataRequest: true,
            dataFailed: false,
            errorMessage: ""
        })
    })

    it('should handle LOGIN_USER_FAILED', () => {
        const res = user(state, userActionCreator.setLoginUserError("Ошибка авторизации"));
        expect(res).toEqual({
            ...state,
            dataFailed: true,
            errorMessage: "Ошибка авторизации",
            user: initialUserState.user,
            isAuthorized: false,
            dataRequest: false
        })
    })

    it('should handle LOGIN_USER_SUCCESS', () => {
        const res = user(state, userActionCreator.setLoginUserData({ user: sourceUser }));
        expect(res).toEqual({
            ...state,
            user: sourceUser,
            isAuthorized: true,
            dataRequest: false
        })
    })
    //#endregion    

    //#region  запрос данных пользователя
    it('should handle GET_USER', () => {
        const res = user(initialUserState, userActionCreator.getUser());
        expect(res).toEqual({
            ...initialUserState,
            dataRequest: true,
            dataFailed: false,
            errorMessage: ""
        })
    })

    it('should handle GET_USER_FAILED', () => {
        const res = user(state, userActionCreator.setGetUserError("Ошибка запроса данных пользователя"));
        expect(res).toEqual({
            ...state,
            dataFailed: true,
            errorMessage: "Ошибка запроса данных пользователя",
            user: initialUserState.user,
            isAuthorized: false,
            dataRequest: false
        })
    })

    it('should handle GET_USER_SUCCESS', () => {
        const res = user(state, userActionCreator.setGetUserData({ user: sourceUser }));
        expect(res).toEqual({
            ...state,
            user: sourceUser,
            isAuthorized: true,
            dataRequest: false
        })
    })
    //#endregion  

    //#region  обновление данных пользователя
    it('should handle UPDATE_USER', () => {
        const res = user(initialUserState, userActionCreator.updateUser());
        expect(res).toEqual({
            ...initialUserState,
            dataRequest: true,
            dataFailed: false,
            errorMessage: ""
        })
    })

    it('should handle UPDATE_USER_FAILED', () => {
        const res = user(state, userActionCreator.setUpdateUserError("Ошибка обновления данных пользователя"));
        expect(res).toEqual({
            ...state,
            dataFailed: true,
            errorMessage: "Ошибка обновления данных пользователя",
            dataRequest: false
        })
    })

    it('should handle UPDATE_USER_SUCCESS', () => {
        const res = user(state, userActionCreator.setUpdateUserData({ user: sourceUser }));
        expect(res).toEqual({
            ...state,
            user: sourceUser,
            dataRequest: false
        })
    })
    //#endregion  

    //#region  восстановление пароля
    it('should handle PASSWORD_RECOVER', () => {
        const res = user(initialUserState, userActionCreator.passwordRecover());
        expect(res).toEqual({
            ...initialUserState,
            passwordRecoverRequest: true,
            passwordRecoverFailed: false,
            errorMessage: ""
        })
    })

    it('should handle PASSWORD_RECOVER_FAILED', () => {
        const res = user(state, userActionCreator.setPasswordRecoverError("Ошибка восстановления пароля"));
        expect(res).toEqual({
            ...state,
            passwordRecoverFailed: true,
            errorMessage: "Ошибка восстановления пароля",
            passwordRecoverRequest: false,
        })
    })

    it('should handle PASSWORD_RECOVER_SUCCESS', () => {
        const res = user(state, userActionCreator.setPasswordRecoverSuccess());
        expect(res).toEqual({
            ...state,
            passwordRecoverSuccess: true,
            passwordRecoverRequest: false
        })
    })
    //#endregion  

    //#region  сброс пароля
    it('should handle PASSWORD_RESET', () => {
        const res = user(initialUserState, userActionCreator.passwordReset());
        expect(res).toEqual({
            ...initialUserState,
            passwordResetrRequest: true,
            passwordResetFailed: false,
            errorMessage: ""
        })
    })

    it('should handle PASSWORD_RESET_FAILED', () => {
        const res = user(state, userActionCreator.setPasswordResetError("Ошибка сброса пароля"));
        expect(res).toEqual({
            ...state,
            passwordResetFailed: true,
            errorMessage: "Ошибка сброса пароля",
            passwordResetRequest: false,
        })
    })

    it('should handle PASSWORD_RESET_SUCCESS', () => {
        const res = user(state, userActionCreator.setPasswordResetSuccess());
        expect(res).toEqual({
            ...state,
            passwordResetSuccess: true,
            passwordResetrRequest: false
        })
    })
    //#endregion  

    //#region  выход из системы
    it('should handle LOGOUT_USER', () => {
        const res = user(initialUserState, userActionCreator.logoutUser());
        expect(res).toEqual({
            ...initialUserState,
            dataRequest: true,
            dataFailed: false,
            errorMessage: ""
        })
    })

    it('should handle LOGOUT_USER_FAILED', () => {
        const res = user(state, userActionCreator.setLogoutUserError("Ошибка выхода из системы"));
        expect(res).toEqual({
            ...state,
            dataFailed: true,
            errorMessage: "Ошибка выхода из системы",
            dataRequest: false
        })
    })

    it('should handle LOGOUT_USER_SUCCESS', () => {
        const res = user(state, userActionCreator.setLogoutUserSuccess());
        expect(res).toEqual({
            ...state,
            user: {
                name: '',
                email: ''
            },
            isAuthorized: false,
            // Запрос закончил своё выполнение
            dataRequest: false
        })
    })
    //#endregion    
    

})