import { TOrderActions, orderActionCreator } from "../action-creators"
import { TOrderState, initialOrderState, order } from "./order-reducer"

describe('order reducer(sending order components)', () => {
    const state: TOrderState = {
        ...initialOrderState,
        dataRequest: false,
        dataFailed: true,
        order: {
            name: "",
            number: 252
        }
    }

    it('should return the initial state on empty action', () => {
        expect(order(undefined, {} as TOrderActions)).toEqual(initialOrderState);
    })

    it('should handle RESET_ORDER', () => {
        const res = order(state, orderActionCreator.resetOrder());
        expect(res).toEqual(initialOrderState)
    })

    it('should handle GET_ORDER', () => {
        const res = order(state, orderActionCreator.getOrderInfo());
        expect(res).toEqual({
            ...state,
            dataRequest: true,
            dataFailed: false
        })
    })

    it('should handle GET_ORDER_FAILED', () => {
        const res = order(state, orderActionCreator.setOrderError());
        expect(res).toEqual({
            ...state,
            dataFailed: true,
            dataRequest: false,
            order: {
                name: '',
                number: 0
            }
        })
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        const res = order(state, orderActionCreator.setOrderData({
            name: "Флюоресцентный бургер",
            order: {
                number: 3752
            }
        }));
        expect(res).toEqual({
            ...state,
            dataRequest: false,
            order: {
                name: "Флюоресцентный бургер",
                number: 3752
            },
        })
    })
})