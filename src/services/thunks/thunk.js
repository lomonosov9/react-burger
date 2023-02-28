import { actionCreators } from "../actionCreators";
import { getIngredients, getOrder } from '../../utils/burger-api';



export const getIngredientsData = () => {
    return (dispatch, getState, extra) => {
        console.info("start fetching")
        dispatch(actionCreators.getIngredientsData());

        const getIngredientsInfo = async () => {
            try {
                const data = await getIngredients();
                dispatch(actionCreators.setData(data.data));
            }
            catch (e) {
                dispatch(actionCreators.setError());
            };

            console.info("end fetching")
        };

        getIngredientsInfo();
    }
};

export const getOrderInfo = (data) => {
    return (dispatch, getState, extra) => {
        console.info("start order fetching")
        dispatch(actionCreators.getOrderInfo());

        const getOrderData = async () => {
            try {
                const order = await getOrder(data);
                dispatch(actionCreators.setOrderData(order));
            }
            catch (e) {
                dispatch(actionCreators.setOrderError());
            };

            console.info("end order fetching")
        };

        getOrderData();
    }
};