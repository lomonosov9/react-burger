import { ADD_COMPONENT, DELETE_COMPONENT, RESET_COMPONENTS, UPDATE_FILLING_LIST } from "../action-types";


export const constructorActionCreator = {
    addComponent: (payload) => (({
        type: ADD_COMPONENT,
        data: payload
    })),
    deleteComponent: (payload) => (({
        type: DELETE_COMPONENT,
        id: payload
    })),
    updateFillingList: (payload) => (({
        type: UPDATE_FILLING_LIST,
        data: payload
    })),
    resetComponents: () => (({
        type: RESET_COMPONENTS
    }))
}
