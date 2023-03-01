import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "../action-types";

export const ingredientsActionCreator = {
    getIngredientsData: () => ({
        type: GET_INGREDIENTS
    }),
    setError: (payload) => ({
        type: GET_INGREDIENTS_FAILED
    }),
    setIngredientsData: (payload) => (({
        type: GET_INGREDIENTS_SUCCESS,
        data: payload
    }))
}