import { RootState } from "../types"

//Заказ
export const orderSelector        = (state: RootState) => state.order.order
export const orderRequestSelector = (state: RootState) => state.order.dataRequest
export const orderFailedSelector  = (state: RootState) => state.order.dataFailed