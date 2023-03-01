import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, RESET_ORDER } from "../action-types";

export const orderActionCreator = {
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
    }))
}
