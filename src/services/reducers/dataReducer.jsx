import { GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS } from "../actionTypes";

export const initialDataState = {
    dataRequest: false,
    dataFailed: false,
    data: []
}
export const data = (state = initialDataState, action) => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state,
                // Запрос начал выполняться
                dataRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                dataFailed: false,
            };
        }
        case GET_DATA_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                data: action.data,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case GET_DATA_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой, 
                // выставляем соответсвующие значения в хранилище
                dataFailed: true,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        default: {
            return state
        }
    }
}