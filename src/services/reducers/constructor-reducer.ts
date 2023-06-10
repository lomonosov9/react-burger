import { TComponent } from "../types/data";
import { TConstructorActions } from "../action-creators";
import {
    ADD_COMPONENT,
    DELETE_COMPONENT,
    RESET_COMPONENTS,
    UPDATE_FILLING_LIST
} from "../action-types";

export type TConstructorState = {
    bun: TComponent | null;
    filling: TComponent[];
    cost: number;
}

export const initialConstructorState: TConstructorState = {
    bun: null,
    filling: [],
    cost: 0
}

export const getBunCost = (item: TComponent | null) => Number(item?.price) * 2;
export const getFillingCost = (items: TComponent[]) => items?.reduce((acc, obj) => acc + obj.price, 0);
export const getBurgerCost = (bun: TComponent | null, filling: TComponent[]) => getBunCost(bun) + getFillingCost(filling);

export const constructor = (state = initialConstructorState, action: TConstructorActions) => {
    let filling: TComponent[];
    switch (action.type) {
        case ADD_COMPONENT: {
            if (action.data.type === 'bun') {
                return {
                    ...state,
                    bun: action.data,
                    cost: getBurgerCost(action.data, state.filling)
                }
            }
            else {
                filling = [
                    ...state.filling,
                    action.data
                ];
                return {
                    ...state,
                    filling,
                    cost: getBurgerCost(state.bun, filling)
                }
            }
        }
        case DELETE_COMPONENT: {
            filling = state.filling.filter(item => item.dragId !== action.id);
            return {
                ...state,
                filling,
                cost: getBurgerCost(state.bun, filling)
            }
        }
        case UPDATE_FILLING_LIST: {
            filling = [...action.data];
            return {
                ...state,
                filling
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