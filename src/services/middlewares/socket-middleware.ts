import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { Middleware } from "redux"
import { RequestFeed, TFeed } from "../types/data";
import { RootState } from "../types"
import { TFeedActions } from "../feed/actions"
import { TProfileFeedActions } from "../profile-feed/actions";

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<string>,
  disconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  wsOpen: ActionCreatorWithoutPayload,
  wsClose: ActionCreatorWithoutPayload,
  wsError: ActionCreatorWithPayload<string>,
  wsMessage: ActionCreatorWithPayload<TFeed>,
}

export const createSocketMiddleware =
  (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
      let socket: WebSocket | null = null;
      let url = '';

      return (next) => (action: TFeedActions | TProfileFeedActions) => {
        const { dispatch } = store
        const {
          connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen,
        } = wsActions;

        if (connect.match(action)) {
          url = action.payload;
          socket = new WebSocket(url);
          dispatch(wsConnecting())
        }

        if (socket) {
          socket.onopen = () => {
            dispatch(wsOpen());
          }

          socket.onerror = () => {
            dispatch(wsError('Websocket error'));
          }

          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData: RequestFeed = JSON.parse(data);
            const {success, ...feedData} = parsedData;
            if (success) {
              dispatch(wsMessage(feedData));
            }
            else {
              dispatch(wsError("Web Socket Error"));
            }
          }

          socket.onclose = (event: CloseEvent) => {
            if (event.code !== 1000) {
              dispatch(wsError(event.code.toString()));
            }
          }
        }

        if (socket && disconnect.match(action)) {
          dispatch(wsClose());
          socket.close();
        }

        next(action);
      }
    }
  }