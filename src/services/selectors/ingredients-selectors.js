//Список ингридиентов 
export const ingredientsSelector    = (state) => state.ingredients.ingredients
export const requestSelector = (state) => state.ingredients.dataRequest
export const failedSelector  = (state) => state.ingredients.dataFailed