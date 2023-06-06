import { ingredientsActionCreator, orderActionCreator, orderInfoActionCreator, userActionCreator } from "../action-creators";
import {
    getIngredients, getOrder, getFeedOrder, registerRequest, saveTokens, loginRequest,
    passwordRecoverRequest, passwordResetRequest, refreshTokenRequest,
    getUserRequest, updateUserRequest, logoutRequest, deleteTokens
} from '../../utils/burger-api';
import { AppDispatch, AppThunk, RootState, TApplicationActions } from "../types";
import { getCookie } from "../../utils/cookies";
import { TOrder, TUserForm } from "../types/data";

const refreshToken = (afterRefresh: TApplicationActions | AppThunk) => (dispatch: AppDispatch) => {
    refreshTokenRequest()
        .then((res) => {
            const { refreshToken, accessToken } = res;
            saveTokens(refreshToken, accessToken);
            dispatch(afterRefresh);
        })
};

export const getIngredientsData = (): AppThunk => {
    return (dispatch) => {
        dispatch(ingredientsActionCreator.getIngredientsData());

        const getIngredientsInfo = async () => {
            try {
                const { data } = await getIngredients();
                dispatch(ingredientsActionCreator.setIngredientsData(data));
            }
            catch (e) {
                dispatch(ingredientsActionCreator.setIngredintsError());
            };
        };

        getIngredientsInfo();
    }
};

export const getOrderInfo = (data: string[]): AppThunk  => {
    return (dispatch) => {
        dispatch(orderActionCreator.getOrderInfo());

        const getOrderData = async () => {
            try {
                const {name, order} = await getOrder(data);
                dispatch(orderActionCreator.setOrderData({name, order}));
            }
            catch (e) {
                if ((e as Error)?.message === 'jwt expired') {
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

export const getFeedOrderInfo = (orderNumber: number): AppThunk  => {
    return (dispatch) => {
        dispatch(orderInfoActionCreator.getOrderInfoData());

        const getFeedOrderInfoData = async () => {
            try {
                const {orders} = await getFeedOrder(orderNumber);
                dispatch(orderInfoActionCreator.setOrderInfoData(orders[0]));
            }
            catch (e) {
                if ((e as Error)?.message === 'jwt expired') {
                    dispatch(refreshToken(getFeedOrderInfo(orderNumber)));
                }
                else {
                    dispatch(orderInfoActionCreator.setOrderInfoError());
                }
            };
        };

        getFeedOrderInfoData();
    }
};

export const registerUserData = (data: TUserForm): AppThunk => {
    return (dispatch) => {
        dispatch(userActionCreator.registerUser());

        const registerUser = async () => {
            try {
                const res = await registerRequest(data);
                if (res.success) {
                    const { user, accessToken, refreshToken } = res;
                    dispatch(userActionCreator.setRegisterUserData({user}));
                    //сохраняем токены в куках и localStorage
                    saveTokens(refreshToken, accessToken);
                }
                else {
                    dispatch(userActionCreator.setRegisterUserError("Ошибка регистрации"));
                }
            }
            catch (e) {
                dispatch(userActionCreator.setRegisterUserError((e as Error)?.message));
            };
        };

        registerUser();
    }
};

export const loginUserData = (data: TUserForm): AppThunk => {
    return (dispatch) => {
        dispatch(userActionCreator.loginUser());

        const loginUser = async () => {
            try {
                const res = await loginRequest(data);
                if (res.success) {
                    const { user, accessToken, refreshToken } = res;
                    dispatch(userActionCreator.setLoginUserData({user}));
                    //сохраняем токены в куках и localStorage
                    saveTokens(refreshToken, accessToken);
                }
                else {
                    dispatch(userActionCreator.setLoginUserError("Ошибка авторизации"));
                }
            }
            catch (e) {
                dispatch(userActionCreator.setLoginUserError((e as Error)?.message));
            };
        };

        loginUser();
    }
};

export const passwordRecoverData = (data: TUserForm): AppThunk => {
    return (dispatch) => {
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
                dispatch(userActionCreator.setPasswordRecoverError((e as Error)?.message));
            };
        };

        passwordRecover();
    }
};

export const passwordResetData = (data: TUserForm): AppThunk => {
    return (dispatch) => {
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
                dispatch(userActionCreator.setPasswordResetError((e as Error)?.message));
            };
        };

        passwordReset();
    }
};

export const getUserData = (): AppThunk => {
    return (dispatch) => {
        dispatch(userActionCreator.getUser());

        const getUser = async () => {
            try {
                const res = await getUserRequest();
                const { user } = res;
                dispatch(userActionCreator.setGetUserData({user}));
            }
            catch(e) {
                if ((e as Error)?.message === 'jwt expired') {
                    dispatch(refreshToken(getUserData()));
                }
                else {
                    dispatch(userActionCreator.setGetUserError((e as Error)?.message));
                }
            };
        };

        getUser();
    }
};

export const checkUserAuth = (): AppThunk => (dispatch) => {
    if (getCookie("token")) {
        dispatch(getUserData());
    }
    else if (localStorage.getItem('refreshToken')){
        dispatch(refreshToken(getUserData()));
    }
};

export const updateUserData = (form: TUserForm): AppThunk => {
    return (dispatch) => {
        dispatch(userActionCreator.updateUser());

        const updateUser = async () => {
            try {
                const res = await updateUserRequest(form);
                const { user } = res;
                dispatch(userActionCreator.setUpdateUserData({user}));
            }
            catch (e) {
                if ((e as Error)?.message === 'jwt expired') {
                    dispatch(refreshToken(updateUserData(form)));
                }
                else {
                    dispatch(userActionCreator.setUpdateUserError((e as Error)?.message));
                }
            };
        };

        updateUser();
    }
};

export const logoutUserData = (): AppThunk => {
    return (dispatch) => {
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
                dispatch(userActionCreator.setLogoutUserError((e as Error)?.message));
            };
        };

        logoutUser();
    }
};