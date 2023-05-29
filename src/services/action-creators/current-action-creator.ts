import type { TIngredient } from "../types/data";
import { 
    SET_CURRENT_INGRIDIENT, 
    RESET_CURRENT_INGRIDIENT 
} from "../action-types";

export type TSetCurrentIngridientAction = {
    readonly type: typeof SET_CURRENT_INGRIDIENT;
    readonly data: TIngredient;
}

export type TResetCurrentIngridientAction = {
    readonly type: typeof RESET_CURRENT_INGRIDIENT
}

//объединяем в Union
export type TCurrentActions = 
| TSetCurrentIngridientAction
| TResetCurrentIngridientAction;

export const currentActionCreator = {
    setCurrentIngridient: (payload: TIngredient): TSetCurrentIngridientAction => (({
        type: SET_CURRENT_INGRIDIENT,
        data: payload
    })),
    resetCurrentIngridient: (): TResetCurrentIngridientAction => (({
        type: RESET_CURRENT_INGRIDIENT
    }))

}
