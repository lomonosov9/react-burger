import { ingredientsActionCreator, orderActionCreator, userActionCreator } from "../action-creators";
import {
    getIngredients, getOrder, registerRequest, saveTokens, loginRequest,
    passwordRecoverRequest, passwordResetRequest, refreshTokenRequest,
    getUserRequest, updateUserRequest, logoutRequest, deleteTokens
} from '../../utils/burger-api';
import { getCookie } from "../../utils/cookies";

const refreshToken = (afterRefresh) => (dispatch) => {
    refreshTokenRequest()
        .then((res) => {
            const { refreshToken, accessToken } = res;
            saveTokens(refreshToken, accessToken);
            dispatch(afterRefresh);
        })
};

export const getIngredientsData = () => {
    return (dispatch, getState, extra) => {
        dispatch(ingredientsActionCreator.getIngredientsData());

        const getIngredientsInfo = async () => {
            try {
                const { data } = await getIngredients();
                dispatch(ingredientsActionCreator.setIngredientsData(data));
            }
            catch (e) {
                dispatch(ingredientsActionCreator.setError());
            };
        };

        getIngredientsInfo();
    }
};

export const getOrderInfo = (data) => {
    return (dispatch, getState, extra) => {
        dispatch(orderActionCreator.getOrderInfo());

        const getOrderData = async () => {
            try {
                const order = await getOrder(data);
                dispatch(orderActionCreator.setOrderData(order));
            }
            catch (e) {
                if (e?.message === 'jwt expired') {
                    dispatch(refreshToken(getOrderInfo(data)));
                }
                else {
                    dispatch(orderActionCreator.setOrderError());
                }
            };
        };

        getOrderData();
    }
};

export const registerUserData = (data) => {
    return (dispatch, getState, extra) => {
        dispatch(userActionCreator.registerUser());

        const registerUser = async () => {
            try {
                const res = await registerRequest(data);
                if (res.success) {
                    const { user, accessToken, refreshToken } = res;
                    dispatch(userActionCreator.setRegisterUserData(user));
                    //сохраняем токены в куках и localStorage
                    saveTokens(refreshToken, accessToken);
                }
                else {
                    const { message } = res;
                    dispatch(userActionCreator.setRegisterUserError(message || ""));
                }
            }
            catch (e) {
                dispatch(userActionCreator.setRegisterUserError(e?.message));
            };
        };

        registerUser();
    }
};

export const loginUserData = (data) => {
    return (dispatch, getState, extra) => {
        dispatch(userActionCreator.loginUser());

        const loginUser = async () => {
            try {
                const res = await loginRequest(data);
                if (res.success) {
                    const { user, accessToken, refreshToken } = res;
                    dispatch(userActionCreator.setLoginUserData(user));
                    //сохраняем токены в куках и localStorage
                    saveTokens(refreshToken, accessToken);
                }
                else {
                    const { message } = res;
                    dispatch(userActionCreator.setLoginUserError(message || ""));
                }
            }
            catch (e) {
                dispatch(userActionCreator.setLoginUserError(e?.message));
            };
        };

        loginUser();
    }
};

export const passwordRecoverData = (data) => {
    return (dispatch, getState, extra) => {
        dispatch(userActionCreator.passwordRecover());

        const passwordRecover = async () => {
            try {
                const res = await passwordRecoverRequest(data);
                if (res.success) {
                    dispatch(userActionCreator.setPasswordRecoverSuccess());
                }
                else {
                    const { message } = res;
                    dispatch(userActionCreator.setPasswordRecoverError(message || ""));
                }
            }
            catch (e) {
                dispatch(userActionCreator.setPasswordRecoverError(e?.message));
            };
        };

        passwordRecover();
    }
};

export const passwordResetData = (data) => {
    return (dispatch, getState, extra) => {
        dispatch(userActionCreator.passwordReset());

        const passwordReset = async () => {
            try {
                const res = await passwordResetRequest(data);
                if (res.success) {
                    dispatch(userActionCreator.setPasswordResetSuccess());
                }
                else {
                    const { message } = res;
                    dispatch(userActionCreator.setPasswordResetError(message || ""));
                }
            }
            catch (e) {
                dispatch(userActionCreator.setPasswordResetError(e?.message));
            };
        };

        passwordReset();
    }
};

export const getUserData = () => {
    return (dispatch, getState, extra) => {
        dispatch(userActionCreator.getUser());

        const getUser = async () => {
            try {
                const res = await getUserRequest();
                const { user } = res;
                dispatch(userActionCreator.setGetUserData(user));
            }
            catch(e) {
                if (e?.message === 'jwt expired') {
                    dispatch(refreshToken(getUserData()));
                }
                else {
                    dispatch(userActionCreator.setGetUserError(e?.message));
                }
            };
        };

        getUser();
    }
};

export const checkUserAuth = () => (dispatch) => {
    if (getCookie("token")) {
        dispatch(getUserData());
    }
    else if (localStorage.getItem('refreshToken')){
        dispatch(refreshToken(getUserData()));
    }
};

export const updateUserData = (form) => {
    return (dispatch, getState, extra) => {
        dispatch(userActionCreator.updateUser());

        const updateUser = async () => {
            try {
                const res = await updateUserRequest(form);
                const { user } = res;
                dispatch(userActionCreator.setUpdateUserData(user));
            }
            catch (e) {
                if (e?.message === 'jwt expired') {
                    dispatch(refreshToken(updateUserData(form)));
                }
                else {
                    dispatch(userActionCreator.setUpdateUserError(e?.message));
                }
            };
        };

        updateUser();
    }
};

export const logoutUserData = (data) => {
    return (dispatch, getState, extra) => {
        dispatch(userActionCreator.logoutUser());

        const logoutUser = async () => {
            try {
                const res = await logoutRequest();
                if (res.success) {
                    dispatch(userActionCreator.setLogoutUserSuccess());
                    //удаляем токены в куках и localStorage
                    deleteTokens();
                }
                else {
                    const { message } = res;
                    dispatch(userActionCreator.setLogoutUserError(message || ""));
                }
            }
            catch (e) {
                dispatch(userActionCreator.setLogoutUserError(e?.message));
            };
        };

        logoutUser();
    }
};