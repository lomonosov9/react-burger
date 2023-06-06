import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { createSocketMiddleware } from "./middlewares";
import { initialIngredientsState } from "./reducers/ingredients-reducer";
import { initialOrderState } from "./reducers/order-reducer";
import { initialConstructorState } from "./reducers/constructor-reducer";
import { initialCurrentState } from "./reducers/current-reducer";
import { initialFeedState } from "./feed/reducer";
import { initialProfileFeedState } from "./profile-feed/reducer";
import { initialOrderInfoState } from "./reducers/order-info-reducer";
import {
    connect as FeedWsConnect,
    disconnect as FeedWsDisconnect,
    wsConnecting as FeedWsConnecting,
    wsOpen as FeedWsOpen,
    wsClose as FeedWsClose,
    wsMessage as FeedWsMessage,
    wsError as FeedWsError
} from "./feed/actions";
import {
    connect as ProfileFeedWsConnect,
    disconnect as ProfileFeedWsDisconnect,
    wsConnecting as ProfileFeedWsConnecting,
    wsOpen as ProfileFeedWsOpen,
    wsClose as ProfileFeedWsClose,
    wsMessage as ProfileFeedWsMessage,
    wsError as ProfileFeedWsError
} from "./profile-feed/actions";


const wsActionsFeed = {
    connect: FeedWsConnect,
    disconnect: FeedWsDisconnect,
    wsConnecting: FeedWsConnecting,
    wsOpen: FeedWsOpen,
    wsClose: FeedWsClose,
    wsError: FeedWsError,
    wsMessage: FeedWsMessage,
};

const wsActionsProfileFeed = {
    connect: ProfileFeedWsConnect,
    disconnect: ProfileFeedWsDisconnect,
    wsConnecting: ProfileFeedWsConnecting,
    wsOpen: ProfileFeedWsOpen,
    wsClose: ProfileFeedWsClose,
    wsError: ProfileFeedWsError,
    wsMessage: ProfileFeedWsMessage,
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const websocketMiddlewareFeed = createSocketMiddleware(wsActionsFeed);
const websocketMiddlewareProfileFeed = createSocketMiddleware(wsActionsProfileFeed);

export const store = createStore(
    rootReducer,
    {
        ingredients: initialIngredientsState,
        order: initialOrderState,
        constructor: initialConstructorState,
        current: initialCurrentState,
        feed: initialFeedState,
        profileFeed: initialProfileFeedState,
        orderInfo: initialOrderInfoState
    },
    composeEnhancers(
        applyMiddleware(
            thunk,
            websocketMiddlewareFeed,
            websocketMiddlewareProfileFeed
        )
    )
);