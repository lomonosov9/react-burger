import { RootState } from "../types"

//конструктор
export const bunSelector     = (state: RootState) => state.constructor.bun
export const fillingSelector = (state: RootState) => state.constructor.filling
export const costSelector    = (state: RootState) => state.constructor.cost