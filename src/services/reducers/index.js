import { combineReducers } from 'redux';
import {data} from "./dataReducer";
import {order} from "./orderReducer";
import {constructor} from "./constructorReducer";
import {current} from "./currentReducer";


// Корневой редьюсер
const rootReducer = combineReducers({
    data,
    order,
    constructor,
    current
}) 

export default rootReducer;