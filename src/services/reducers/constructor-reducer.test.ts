import { TComponent } from "../types/data";
import { initialConstructorState, constructor, TConstructorState } from "./constructor-reducer";
import { TConstructorActions, constructorActionCreator } from "../action-creators";

describe('constructor reducer', () => {
    const sourceBun: TComponent = {
        dragId: "643d69a5c3f7b9001cfa093c",
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

    const sourceFilling1: TComponent = {
        dragId: "643d69a5c3f7b9001cfa093c",
        _id: "643d69a5c3f7b9001cfa093e",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0
    };

    const sourceFilling2: TComponent = {
        dragId: "643d69a5c3f7b9001cfa0942",
        _id: "643d69a5c3f7b9001cfa0942",
        name: "Соус Spicy-X",
        type: "sauce",
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        __v: 0
    };

    const state: TConstructorState = {
        bun: sourceBun,
        filling: [sourceFilling1, sourceFilling2],
        cost: 3588
    }
    it('should return the initial state on empty action', () => {
        expect(constructor(undefined, {} as TConstructorActions)).toEqual(initialConstructorState)
    })

    it('should handle RESET_COMPONENTS and return the initial state', () => {
        const res = constructor(state, constructorActionCreator.resetComponents());
        expect(res).toEqual(initialConstructorState)
    })

    it('should handle ADD_COMPONENT and add bun', () => {
        const res = constructor(initialConstructorState, constructorActionCreator.addComponent(sourceBun));
        expect(res).toEqual({
            ...initialConstructorState,
            bun: sourceBun,
            cost: 2510
        })
    })

    it('should handle ADD_COMPONENT and add 1 filling', () => {
        const state = {
            ...initialConstructorState,
            bun: sourceBun,
            cost: 2510
        }
        const res = constructor(state, constructorActionCreator.addComponent(sourceFilling1));
        expect(res).toEqual({
            ...state,
            filling: [sourceFilling1],
            cost: 3498
        })
    })

    it('should handle DELETE_COMPONENT and delete 1 filling', () => {
        const res = constructor(state, constructorActionCreator.deleteComponent(sourceFilling2._id));
        expect(res).toEqual({
            ...state,
            filling: [sourceFilling1],
            cost: 3498
        })
    })

    it('should handle UPDATE_FILLING_LIST and get fillings reversed', () => {
        const res = constructor(state, constructorActionCreator.updateFillingList([sourceFilling2, sourceFilling1]));
        expect(res).toEqual({
            ...state,
            filling: [sourceFilling2, sourceFilling1]
        })
    })
})