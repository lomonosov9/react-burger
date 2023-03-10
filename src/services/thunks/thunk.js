import { ingredientsActionCreator, orderActionCreator } from "../action-creators";
import { getIngredients, getOrder } from '../../utils/burger-api';



export const getIngredientsData = () => {
    return (dispatch, getState, extra) => {
         dispatch(ingredientsActionCreator.getIngredientsData());

        const getIngredientsInfo = async () => {
            try {
                const {data} = await getIngredients();
                dispatch(ingredientsActionCreator.setIngredientsData(data));
            }
            catch (e) {
                dispatch(ingredientsActionCreator.setError());
            };
        };

        getIngredientsInfo();
    }
};

export const getOrderInfo = (data) => {
    return (dispatch, getState, extra) => {
        dispatch(orderActionCreator.getOrderInfo());

        const getOrderData = async () => {
            try {
                const order = await getOrder(data);
                dispatch(orderActionCreator.setOrderData(order));
            }
            catch (e) {
                dispatch(orderActionCreator.setOrderError());
            };
        };

        getOrderData();
    }
};