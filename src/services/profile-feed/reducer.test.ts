import { profileFeed, initialProfileFeedState } from "./reducer";
import * as types from './actions';
import { TFeed, WebsocketStatus } from "../types/data";


describe('profileFeed reducer', () => {
    it('should return the initial state on empty action', () => {
        expect(profileFeed(undefined, {type : ""})).toEqual(initialProfileFeedState)
    })

    it('should handle PROFILE_FEED_WS_CONNECTING', () => {
        const res = profileFeed(initialProfileFeedState, types.wsConnecting());
        expect(res).toEqual({
            ...initialProfileFeedState,
            status : WebsocketStatus.CONNECTING,
            connectionError: ''
        })
    })

    it('should handle PROFILE_FEED_WS_OPEN', () => {
        const res = profileFeed(initialProfileFeedState, types.wsOpen());
        expect(res).toEqual({
            ...initialProfileFeedState,
            status : WebsocketStatus.ONLINE,
            connectionError: ''
        })
    })

    it('should handle PROFILE_FEED_WS_CLOSE', () => {
        const res = profileFeed(initialProfileFeedState, types.wsClose());
        expect(res).toEqual({
            ...initialProfileFeedState,
            status : WebsocketStatus.OFFLINE,
            connectionError: ''
        })
    })

    it('should handle PROFILE_FEED_WS_ERROR', () => {
        const res = profileFeed(initialProfileFeedState, types.wsError("Ошибка веб-сокета"));
        expect(res).toEqual({
            ...initialProfileFeedState,
            connectionError: "Ошибка веб-сокета"
        })
    })

    it('should handle PROFILE_FEED_WS_MESSAGE', () => {
        const sourceFeed: TFeed = {
            orders: [
                {
                    _id: "646a09e48a4b62001c83abba",
                    ingredients: [
                        "643d69a5c3f7b9001cfa093d",
                        "643d69a5c3f7b9001cfa0945",
                        "643d69a5c3f7b9001cfa0943",
                        "643d69a5c3f7b9001cfa0944",
                        "643d69a5c3f7b9001cfa093d"
                    ],
                    status: "done",
                    name: "Антарианский space традиционный-галактический флюоресцентный бургер",
                    createdAt: "2023-05-21T12:09:08.523Z",
                    updatedAt: "2023-05-21T12:09:08.649Z",
                    number: 4884
                },
                {
                    _id: "64721cfc8a4b62001c8417d3",
                    ingredients: [
                        "643d69a5c3f7b9001cfa093d",
                        "643d69a5c3f7b9001cfa0945",
                        "643d69a5c3f7b9001cfa093e",
                        "643d69a5c3f7b9001cfa093d"
                    ],
                    status: "done",
                    name: "Антарианский люминесцентный флюоресцентный бургер",
                    createdAt: "2023-05-27T15:08:44.500Z",
                    updatedAt: "2023-05-27T15:08:44.569Z",
                    number: 5644
                }
            ],
            total: 7527,
            totalToday: 260
        }

        const res = profileFeed(initialProfileFeedState, types.wsMessage(sourceFeed));
        expect(res).toEqual({
            ...initialProfileFeedState,
            feed: sourceFeed,
            connectionError: ''
        })
    })
   
})