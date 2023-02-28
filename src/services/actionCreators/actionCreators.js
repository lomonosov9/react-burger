import { GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS } from "../actionTypes";
import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, RESET_ORDER } from "../actionTypes";
import { ADD_COMPONENT, DELETE_COMPONENT, RESET_COMPONENTS, UPDATE_FILLING_LIST } from "../actionTypes";
import { SET_CURRENT_INGRIDIENT, RESET_CURRENT_INGRIDIENT } from "../actionTypes";


export const actionCreators = {
    //ингредиенты
    getIngredientsData: () => ({
        type: GET_DATA
    }),
    setError: (payload) => ({
        type: GET_DATA_FAILED
    }),
    setData: (payload) => (({
        type: GET_DATA_SUCCESS,
        data: payload
    })),

    //заказ
    getOrderInfo: () => ({
        type: GET_ORDER
    }),
    setOrderError: (payload) => ({
        type: GET_ORDER_FAILED
    }),
    setOrderData: (payload) => (({
        type: GET_ORDER_SUCCESS,
        data: payload
    })),
    resetOrder: () => (({
        type: RESET_ORDER
    })),

    //конструктор
    addComponent: (payload) => (({
        type: ADD_COMPONENT,
        data: payload
    })),
    deleteComponent: (payload) => (({
        type: DELETE_COMPONENT,
        id: payload
    })),
    updateFillingList: (payload) => (({
        type: UPDATE_FILLING_LIST,
        data: payload
    })),
    resetComponents: () => (({
        type: RESET_COMPONENTS
    })),

    //текущий просматриваемый ингридиент
    setCurrentIngridient: (payload) => (({
        type: SET_CURRENT_INGRIDIENT,
        data: payload
    })),
    resetCurrentIngridient: () => (({
        type: RESET_CURRENT_INGRIDIENT
    })),
    
}
