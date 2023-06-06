import { TOrderInfoActions } from "../action-creators";
import { 
    GET_ORDER_INFO, 
    GET_ORDER_INFO_FAILED, 
    GET_ORDER_INFO_SUCCESS
} from "../action-types";
import { TOrderInfo } from "../types/data";

export type TOrderInfoState = {
    dataRequest: boolean;
    dataFailed: boolean;
    order: TOrderInfo | null;
}

export const initialOrderInfoState: TOrderInfoState = {
    dataRequest: false,
    dataFailed: false,
    order: null
}
export const orderInfo = (state = initialOrderInfoState, action: TOrderInfoActions) => {
    switch (action.type) {
        case GET_ORDER_INFO: {
            return {
                ...state,
                // Запрос начал выполняться
                dataRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                dataFailed: false,
            };
        }
        case GET_ORDER_INFO_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                order: action.data, 
                // Запрос закончил своё выполнение
                dataRequest: false
            };
        }
        case GET_ORDER_INFO_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой, 
                // выставляем соответсвующие значения в хранилище
                dataFailed: true,
                // Запрос закончил своё выполнение
                dataRequest: false,
                order: null
            };
        }
        default: {
            return state
        }
    }
}