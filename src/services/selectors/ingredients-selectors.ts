import { RootState } from "../types"

//Список ингридиентов 
export const ingredientsSelector    = (state: RootState) => state.ingredients.ingredients
export const requestSelector = (state: RootState) => state.ingredients.dataRequest
export const failedSelector  = (state: RootState) => state.ingredients.dataFailed