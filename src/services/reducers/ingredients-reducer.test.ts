import { TIngredientsActions, ingredientsActionCreator } from "../action-creators";
import { initialIngredientsState, ingredients, TIngredientsState } from "./ingredients-reducer";
import { TIngredient } from "../types/data";

describe('ingredients reducer', () => {
    const sourceItems: TIngredient[] = [
        {
            _id: "643d69a5c3f7b9001cfa093c",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        },
        {
            _id: "643d69a5c3f7b9001cfa0941",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
            __v: 0
        }
    ];

    const state: TIngredientsState = {
        ...initialIngredientsState,
        dataRequest: true,
        dataFailed: false,
        ingredients: sourceItems
    }

    it('should return the initial state on empty action', () => {
        expect(ingredients(undefined, {} as TIngredientsActions)).toEqual(initialIngredientsState);
    })

    it('should handle GET_INGREDIENTS', () => {
        const res = ingredients(initialIngredientsState, ingredientsActionCreator.getIngredientsData());
        expect(res).toEqual({
            ...initialIngredientsState,
            dataRequest: true,
            dataFailed: false
        })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        const res = ingredients(state, ingredientsActionCreator.setIngredintsError());
        expect(res).toEqual({
            ...state,
            dataFailed: true,
            dataRequest: false,
            ingredients: []
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const res = ingredients(state, ingredientsActionCreator.setIngredientsData(sourceItems));
        expect(res).toEqual({
            ...state,
            dataRequest: false,
            ingredients: sourceItems
        })
    })  

})
