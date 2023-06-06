import { TComponent } from "../types/data";
import { 
    ADD_COMPONENT, 
    DELETE_COMPONENT, 
    RESET_COMPONENTS, 
    UPDATE_FILLING_LIST 
} from "../action-types";

export type TAddComponentAction = {
    readonly type: typeof ADD_COMPONENT;
    readonly data: TComponent;
}

export type TDeleteComponentAction = {
    readonly type: typeof DELETE_COMPONENT;
    readonly id: string;
}

export type TResetComponentsAction = {
    readonly type: typeof RESET_COMPONENTS;
}

export type TUpdateFillingListAction = {
    readonly type: typeof UPDATE_FILLING_LIST;
    readonly data: TComponent[];
}

//объединяем в Union
export type TConstructorActions = 
| TAddComponentAction
| TDeleteComponentAction
| TResetComponentsAction
| TUpdateFillingListAction;

export const constructorActionCreator = {
    addComponent: (payload: TComponent): TAddComponentAction => (({
        type: ADD_COMPONENT,
        data: payload
    })),
    deleteComponent: (payload: string): TDeleteComponentAction => (({
        type: DELETE_COMPONENT,
        id: payload
    })),
    updateFillingList: (payload: TComponent[]): TUpdateFillingListAction => (({
        type: UPDATE_FILLING_LIST,
        data: payload
    })),
    resetComponents: () => (({
        type: RESET_COMPONENTS
    }))
}
