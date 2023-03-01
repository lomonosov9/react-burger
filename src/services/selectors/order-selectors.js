//Заказ
export const orderSelector        = (state) => state.order.order
export const orderRequestSelector = (state) => state.order.dataRequest
export const orderFailedSelector  = (state) => state.order.dataFailed