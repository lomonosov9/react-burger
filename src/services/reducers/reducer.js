import { GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS } from "../actionTypes";
import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, RESET_ORDER } from "../actionTypes";
import { ADD_COMPONENT, DELETE_COMPONENT, RESET_COMPONENTS, UPDATE_FILLING_LIST } from "../actionTypes";
import { SET_CURRENT_INGRIDIENT, RESET_CURRENT_INGRIDIENT } from "../actionTypes";

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

export const initialConstructorState = {
    bun: {},
    filling: [],
    cost: 0
}

export const constructor = (state = initialConstructorState, action) => {
    switch (action.type) {
        case ADD_COMPONENT: {
            if (action.data.type === 'bun') {
                return {
                    ...state,
                    bun: action.data,
                    cost: action.data.price * 2 + state.filling?.reduce((acc, obj) => acc + obj.price, 0)
                }
            }
            else {
                return {
                    ...state,
                    filling: [
                        ...state.filling,
                        action.data
                    ],
                    cost: state.bun.price * 2 + state.filling?.reduce((acc, obj) => acc + obj.price, 0) + action.data.price
                }
            }
        }
        case DELETE_COMPONENT: {
            return {
                ...state,
                filling: [...state.filling.filter(item => item.dragId !== action.id)],
                cost: state.bun.price * 2 + state.filling.filter(item => item.dragId !== action.id)?.reduce((acc, obj) => acc + obj.price, 0)
            }
        }
        case UPDATE_FILLING_LIST: {
            return {
                ...state,
                filling: [
                    ...action.data
                ]
            }
        }
        case RESET_COMPONENTS: {
            return initialConstructorState;
        }
        default: {
            return state;
        }
    }
}

export const initialCurrentState = {
    ingridient: null
}

export const current = (state = initialCurrentState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGRIDIENT:
            return {
                ingridient: action.data
            }
        case RESET_CURRENT_INGRIDIENT:
            return initialCurrentState;
        default:
            return state;
    }
}