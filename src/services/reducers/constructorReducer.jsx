import { ADD_COMPONENT, DELETE_COMPONENT, RESET_COMPONENTS, UPDATE_FILLING_LIST } from "../actionTypes";

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