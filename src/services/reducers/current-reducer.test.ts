import { initialCurrentState, current, TCurrentState } from "./current-reducer";
import { currentActionCreator } from "../action-creators";
import { TIngredient } from "../types/data";


describe('current reducer (selected ingredient)', () => {
    const sourceIngredient: TIngredient = {
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
    };

    const state: TCurrentState = {
        ...initialCurrentState,
        ingridient: sourceIngredient
    } 

    it('should return the initial state on RESET_CURRENT_INGRIDIENT', () => {
        expect(current(state, currentActionCreator.resetCurrentIngridient()))
        .toEqual(initialCurrentState)
    })

    it('should handle SET_CURRENT_INGRIDIENT', () => {
        expect(current(initialCurrentState, currentActionCreator.setCurrentIngridient(sourceIngredient)))
        .toEqual(state)
    })

})