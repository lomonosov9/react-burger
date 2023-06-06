import { TOrderInfo } from "../types/data";
import {
    GET_ORDER_INFO,
    GET_ORDER_INFO_FAILED,
    GET_ORDER_INFO_SUCCESS
} from "../action-types";

export type TGetOrderInfoDataAction = {
    readonly type: typeof GET_ORDER_INFO;
}

export type TSetOrderInfoErrorAction = {
    readonly type: typeof GET_ORDER_INFO_FAILED;
}

export type TSetOrderInfoDataAction = {
    readonly type: typeof GET_ORDER_INFO_SUCCESS;
    readonly data: TOrderInfo;
}


//объединяем в Union
export type TOrderInfoActions = 
| TGetOrderInfoDataAction
| TSetOrderInfoErrorAction
| TSetOrderInfoDataAction;

export const orderInfoActionCreator = {
    getOrderInfoData: (): TGetOrderInfoDataAction => ({
        type: GET_ORDER_INFO
    }),
    setOrderInfoError: (): TSetOrderInfoErrorAction => ({
        type: GET_ORDER_INFO_FAILED
    }),
    setOrderInfoData: (payload: TOrderInfo): TSetOrderInfoDataAction => (({
        type: GET_ORDER_INFO_SUCCESS,
        data: payload
    })),
}