//Список ингридиентов 
export const dataSelector    = (state) => state.data.data
export const requestSelector = (state) => state.data.dataRequest
export const failedSelector  = (state) => state.data.dataFailed

//Заказ
export const orderSelector        = (state) => state.order.order
export const orderRequestSelector = (state) => state.order.dataRequest
export const orderFailedSelector  = (state) => state.order.dataFailed

//конструктор
export const bunSelector     = (state) => state.constructor.bun
export const fillingSelector = (state) => state.constructor.filling
export const costSelector    = (state) => state.constructor.cost

//текущий просматриваемый ингридиент
export const currentIngridientSelector = (state) => state.current.ingridient;
