import { combineReducers } from 'redux';
import {ingredients} from "./ingredients-reducer";
import {order} from "./order-reducer";
import {constructor} from "./constructor-reducer";
import {current} from "./current-reducer";
import {user} from "./user-reducer";
import {feed} from "../feed/reducer";
import {profileFeed} from "../profile-feed/reducer";
import { orderInfo } from './order-info-reducer';


// Корневой редьюсер
const rootReducer = combineReducers({
    ingredients,
    order,
    constructor,
    current,
    user,
    feed,
    profileFeed,
    orderInfo
}) 

export default rootReducer;