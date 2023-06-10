import { TOrderInfoActions, orderInfoActionCreator } from "../action-creators";
import { TOrderInfo } from "../types/data"
import { initialOrderInfoState, TOrderInfoState, orderInfo } from "./order-info-reducer"

describe('orderInfo reducer(formed order props)', () => {
    const sourceOrder: TOrderInfo = {
        "_id": "6473635c8a4b62001c842296",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa093d"
        ],
        "owner": "645f9a2e8a4b62001c837621",
        "status": "done",
        "name": "Био-марсианский флюоресцентный бургер",
        "createdAt": "2023-05-28T14:21:16.051Z",
        "updatedAt": "2023-05-28T14:21:16.120Z",
        "number": 5872,
        "__v": 0
    };
    const state: TOrderInfoState = {
        ...initialOrderInfoState,
        dataRequest: true,
        dataFailed: false,
        order: sourceOrder
    }

    it('should return the initial state on empty action', () => {
        expect(orderInfo(undefined, {} as TOrderInfoActions)).toEqual(initialOrderInfoState);
    })

    it('should handle GET_ORDER_INFO', () => {
        const res = orderInfo(initialOrderInfoState, orderInfoActionCreator.getOrderInfoData());
        expect(res).toEqual({
            ...initialOrderInfoState,
            dataRequest: true,
            dataFailed: false
        })
    })

    it('should handle GET_ORDER_INFO_FAILED', () => {
        const res = orderInfo(state, orderInfoActionCreator.setOrderInfoError());
        expect(res).toEqual({
            ...state,
            dataFailed: true,
            dataRequest: false,
            order: null
        })
    })

    it('should handle GET_ORDER_INFO_SUCCESS', () => {
        const res = orderInfo(state, orderInfoActionCreator.setOrderInfoData(sourceOrder));
        expect(res).toEqual({
            ...state,
            dataRequest: false,
            order: sourceOrder
        })
    })    


})