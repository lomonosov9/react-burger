import { AppDispatch, RootState } from './types';
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";



//export const useDispatch: () => AppDispatch = dispatchHook; // так не сработало
export const useDispatch = dispatchHook as () => AppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;