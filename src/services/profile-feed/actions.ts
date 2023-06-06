import { createAction } from '@reduxjs/toolkit'
import { TFeed } from '../types/data';

export const connect = createAction<string, 'PROFILE_FEED_CONNECT'>('PROFILE_FEED_CONNECT')
export const disconnect = createAction('PROFILE_FEED_DISCONNECT');
export const wsConnecting = createAction('PROFILE_FEED_WS_CONNECTING');
export const wsOpen = createAction('PROFILE_FEED_WS_OPEN');
export const wsClose = createAction('PROFILE_FEED_WS_CLOSE');
export const wsMessage = createAction<TFeed, 'PROFILE_FEED_WS_MESSAGE'>('PROFILE_FEED_WS_MESSAGE');
export const wsError = createAction<string, 'PROFILE_FEED_WS_ERROR'>('PROFILE_FEED_WS_ERROR');

export type TProfileFeedActions =
    ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;