import { TIngredient } from "../types/data";
import { 
    GET_INGREDIENTS, 
    GET_INGREDIENTS_FAILED, 
    GET_INGREDIENTS_SUCCESS 
} from "../action-types";

export type TGetIngredientsDataAction = {
    readonly type: typeof GET_INGREDIENTS;
}

export type TSetIngredintsErrorAction = {
    readonly type: typeof GET_INGREDIENTS_FAILED;
 }

export type TSetIngredientsDataAction = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly data: TIngredient[];
}

//объединяем в Union
export type TIngredientsActions = 
| TGetIngredientsDataAction
| TSetIngredintsErrorAction
| TSetIngredientsDataAction;


export const ingredientsActionCreator = {
    getIngredientsData: (): TGetIngredientsDataAction => ({
        type: GET_INGREDIENTS
    }),
    setIngredintsError: (): TSetIngredintsErrorAction => ({
        type: GET_INGREDIENTS_FAILED
    }),
    setIngredientsData: (payload: TIngredient[]): TSetIngredientsDataAction => (({
        type: GET_INGREDIENTS_SUCCESS,
        data: payload
    }))
}