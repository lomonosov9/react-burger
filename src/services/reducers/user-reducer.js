import {
    LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS,
    REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS,
    PASSWORD_RECOVER, PASSWORD_RECOVER_FAILED, PASSWORD_RECOVER_SUCCESS,
    PASSWORD_RESET, PASSWORD_RESET_FAILED, PASSWORD_RESET_SUCCESS,
    GET_USER, GET_USER_FAILED, GET_USER_SUCCESS,
    UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS,
    LOGOUT_USER, LOGOUT_USER_FAILED, LOGOUT_USER_SUCCESS,
} from "../action-types";

export const initialUserState = {
    dataRequest: false,
    dataFailed: false,
    errorMessage: "",
    user: {
        "email": "",
        "name": ""
    },
    isAuthorized: false,
    passwordRecoverSuccess: false,
    passwordRecoverRequest: false,
    passwordRecoverFailed: false,
    passwordResetSuccess: false,
    passwordResetRequest: false,
    passwordResetFailed: false
}
export const user = (state = initialUserState, action) => {
    switch (action.type) {
        case LOGOUT_USER:
        case GET_USER:
        case UPDATE_USER:
        case LOGIN_USER:
        case REGISTER_USER: {
            return {
                ...state,
                // Запрос начал выполняться
                dataRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                dataFailed: false,
                errorMessage: ""
            };
        }
        case GET_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно
                user: {
                    name: action.data?.name,
                    email: action.data?.email
                },
                isAuthorized: true,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case GET_USER_FAILED:
        case LOGIN_USER_FAILED:
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой
                dataFailed: true,
                errorMessage: action.payload,
                user: {
                    name: '',
                    email: ''
                },
                isAuthorized: false,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case PASSWORD_RECOVER: {
            return {
                ...state,
                // Запрос начал выполняться
                passwordRecoverRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                passwordRecoverFailed: false,
                errorMessage: ""
            };
        }
        case PASSWORD_RECOVER_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно
                passwordRecoverSuccess: true,
                // Запрос закончил своё выполнение
                passwordRecoverRequest: false
            };
        }
        case PASSWORD_RECOVER_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой
                passwordRecoverFailed: true,
                errorMessage: action.payload,
                // Запрос закончил своё выполнение
                passwordRecoverRequest: false,
            };
        }
        case PASSWORD_RESET: {
            return {
                ...state,
                // Запрос начал выполняться
                passwordResetrRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                passwordResetFailed: false,
                errorMessage: ""
            };
        }
        case PASSWORD_RESET_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                passwordResetSuccess: true,
                // Запрос закончил своё выполнение
                passwordResetrRequest: false
            };
        }
        case PASSWORD_RESET_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой
                passwordResetFailed: true,
                errorMessage: action.payload,
                // Запрос закончил своё выполнение
                passwordResetRequest: false,
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                user: {
                    name: action.data?.name,
                    email: action.data?.email
                },
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой
                dataFailed: true,
                errorMessage: action.payload,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                // user: action.data, 
                user: {
                    name: '',
                    email: ''
                },
                isAuthorized: false,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой, 
                dataFailed: true,
                errorMessage: action.payload,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        default: {
            return state
        }
    }
}