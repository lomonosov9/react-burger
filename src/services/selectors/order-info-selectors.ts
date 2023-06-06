import { RootState } from "../types"

//Заказ
export const orderInfoSelector        = (state: RootState) => state.orderInfo.order
export const orderInfoRequestSelector = (state: RootState) => state.orderInfo.dataRequest
export const orderInfoFailedSelector  = (state: RootState) => state.orderInfo.dataFailed