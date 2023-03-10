import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "../action-types";

export const initialIngredientsState = {
    dataRequest: false,
    dataFailed: false,
    ingredients: []
}
export const ingredients = (state = initialIngredientsState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                // Запрос начал выполняться
                dataRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                dataFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                ingredients: action.data,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой, 
                // выставляем соответсвующие значения в хранилище
                dataFailed: true,
                // Запрос закончил своё выполнение
                dataRequest: false,
                ingredients: []
            };
        }
        default: {
            return state
        }
    }
}