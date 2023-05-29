import { TOrder } from "../types/data";
import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    RESET_ORDER
} from "../action-types";

export type TGetOrderInfoAction = {
    readonly type: typeof GET_ORDER;
}

export type TSetOrderErrorAction = {
    readonly type: typeof GET_ORDER_FAILED;
}

export type TSetOrderDataAction = {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly data: TOrder;
}

export type TResetOrderAction = {
    readonly type: typeof RESET_ORDER;
}

//объединяем в Union
export type TOrderActions = 
| TGetOrderInfoAction
| TSetOrderErrorAction
| TSetOrderDataAction
| TResetOrderAction;

export const orderActionCreator = {
    getOrderInfo: (): TGetOrderInfoAction => ({
        type: GET_ORDER
    }),
    setOrderError: (): TSetOrderErrorAction => ({
        type: GET_ORDER_FAILED
    }),
    setOrderData: (payload: TOrder): TSetOrderDataAction => (({
        type: GET_ORDER_SUCCESS,
        data: payload
    })),
    resetOrder: (): TResetOrderAction => (({
        type: RESET_ORDER
    }))
}