import { SET_CURRENT_INGRIDIENT, RESET_CURRENT_INGRIDIENT } from "../action-types";

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