import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { customMiddleware } from "./middlewares";
import {initialDataState} from "./reducers/dataReducer";
import {initialOrderState} from "./reducers/orderReducer";
import {initialConstructorState} from "./reducers/constructorReducer";
import {initialCurrentState} from "./reducers/currentReducer";

export const configureStore = () => {
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const store = createStore(
        rootReducer,
        {
            data: initialDataState,
            order: initialOrderState,
            constructor: initialConstructorState,
            current: initialCurrentState
        },
        composeEnhancers(
            applyMiddleware(
                thunk,
                customMiddleware()
            )
        )
    );
    return store;
};