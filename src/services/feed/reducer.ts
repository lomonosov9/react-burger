import { createReducer } from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";
import { TFeed, WebsocketStatus } from "../types/data";

export type FeedStore = {
  status: WebsocketStatus;
  connectionError: string;
  feed: TFeed | null
}

export const initialFeedState: FeedStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  feed: null,
}

export const feed = createReducer(initialFeedState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING
      state.connectionError=''
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE
      state.connectionError=''
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE
      state.connectionError = ''
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload
    })
    .addCase(wsMessage, (state, action) => {
      state.feed = action.payload;
      state.connectionError=''
    })
})