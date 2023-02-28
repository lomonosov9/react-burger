import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, RESET_ORDER } from "../actionTypes";

export const initialOrderState = {
    dataRequest: false,
    dataFailed: false,
    order: {
        name: '',
        number: 0
    }
}
export const order = (state = initialOrderState, action) => {
    switch (action.type) {
        case GET_ORDER: {
            return {
                ...state,
                // Запрос начал выполняться
                dataRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                dataFailed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                //order: action.data, 
                order: {
                    name: action.data?.name,
                    number: action.data?.order.number
                },
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой, 
                // выставляем соответсвующие значения в хранилище
                dataFailed: true,
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case RESET_ORDER: {
            return initialOrderState;
        }
        default: {
            return state
        }
    }
}