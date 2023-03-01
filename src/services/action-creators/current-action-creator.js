import { SET_CURRENT_INGRIDIENT, RESET_CURRENT_INGRIDIENT } from "../action-types";


export const currentActionCreator = {
    setCurrentIngridient: (payload) => (({
        type: SET_CURRENT_INGRIDIENT,
        data: payload
    })),
    resetCurrentIngridient: () => (({
        type: RESET_CURRENT_INGRIDIENT
    }))
    
}
