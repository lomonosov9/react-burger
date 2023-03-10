import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { customMiddleware } from "./middlewares";
import {initialIngredientsState} from "./reducers/ingredients-reducer";
import {initialOrderState} from "./reducers/order-reducer";
import {initialConstructorState} from "./reducers/constructor-reducer";
import {initialCurrentState} from "./reducers/current-reducer";

export const configureStore = () => {
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const store = createStore(
        rootReducer,
        {
            ingredients: initialIngredientsState,
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