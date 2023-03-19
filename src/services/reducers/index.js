import { combineReducers } from 'redux';
import {ingredients} from "./ingredients-reducer";
import {order} from "./order-reducer";
import {constructor} from "./constructor-reducer";
import {current} from "./current-reducer";
import {user} from "./user-reducer";


// Корневой редьюсер
const rootReducer = combineReducers({
    ingredients,
    order,
    constructor,
    current,
    user
}) 

export default rootReducer;