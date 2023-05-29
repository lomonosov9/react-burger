import { SET_CURRENT_INGRIDIENT, RESET_CURRENT_INGRIDIENT } from "../action-types";
import { TIngredient } from "../types/data";
import { TCurrentActions } from "../action-creators";

export type TCurrentState = {
    ingridient: TIngredient | null;
}

export const initialCurrentState: TCurrentState = {
    ingridient: null
}

export const current = (state = initialCurrentState, action: TCurrentActions) => {
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