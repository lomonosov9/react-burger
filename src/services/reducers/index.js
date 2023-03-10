import { combineReducers } from 'redux';
import {ingredients} from "./ingredients-reducer";
import {order} from "./order-reducer";
import {constructor} from "./constructor-reducer";
import {current} from "./current-reducer";


// Корневой редьюсер
const rootReducer = combineReducers({
    ingredients,
    order,
    constructor,
    current
}) 

export default rootReducer;