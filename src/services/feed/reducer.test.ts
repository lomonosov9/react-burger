import { feed, initialFeedState } from "./reducer";
import * as types from './actions';
import { TFeed, WebsocketStatus } from "../types/data";


describe('feed reducer', () => {
    it('should return the initial state on empty action', () => {
        expect(feed(undefined, {type : ""})).toEqual(initialFeedState)
    })

    it('should handle FEED_WS_CONNECTING', () => {
        const res = feed(initialFeedState, types.wsConnecting());
        expect(res).toEqual({
            ...initialFeedState,
            status : WebsocketStatus.CONNECTING,
            connectionError: ''
        })
    })

    it('should handle FEED_WS_OPEN', () => {
        const res = feed(initialFeedState, types.wsOpen());
        expect(res).toEqual({
            ...initialFeedState,
            status : WebsocketStatus.ONLINE,
            connectionError: ''
        })
    })

    it('should handle FEED_WS_CLOSE', () => {
        const res = feed(initialFeedState, types.wsClose());
        expect(res).toEqual({
            ...initialFeedState,
            status : WebsocketStatus.OFFLINE,
            connectionError: ''
        })
    })

    it('should handle FEED_WS_ERROR', () => {
        const res = feed(initialFeedState, types.wsError("Ошибка веб-сокета"));
        expect(res).toEqual({
            ...initialFeedState,
            connectionError: "Ошибка веб-сокета"
        })
    })

    it('should handle FEED_WS_MESSAGE', () => {
        const sourceFeed: TFeed = {
            orders: [
              {
                _id: "64830a8a8a4b62001c85760f",
                ingredients: [
                  "643d69a5c3f7b9001cfa093d",
                  "643d69a5c3f7b9001cfa093e",
                  "643d69a5c3f7b9001cfa093e"
                ],
                status: "done",
                name: "Люминесцентный флюоресцентный бургер",
                createdAt: "2023-06-09T11:18:34.579Z",
                updatedAt: "2023-06-09T11:18:34.674Z",
                number: 7899
              },
              {
                _id: "64830a7c8a4b62001c85760d",
                ingredients: [
                  "643d69a5c3f7b9001cfa093d",
                  "643d69a5c3f7b9001cfa0943"
                ],
                status: "done",
                name: "Space флюоресцентный бургер",
                createdAt: "2023-06-09T11:18:20.005Z",
                updatedAt: "2023-06-09T11:18:20.259Z",
                number: 7898
              }
            ],
            total: 7527,
            totalToday: 262
          }

        const res = feed(initialFeedState, types.wsMessage(sourceFeed));
        expect(res).toEqual({
            ...initialFeedState,
            feed: sourceFeed,
            connectionError: ''
        })
    })
   
})