import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { currentIngridientSelector, ingredientsSelector } from '../services/selectors';
import { currentActionCreator } from '../services/action-creators';
import styles from './ingredients-details.module.css';
import IngredientDetails from "../components/burger-ingredients/ingredient-details/ingredient-details";
import { getIngredientsData } from "../services/thunks";
import { TIngredient } from "../utils/types";

const IngredientsDetailsPage = () => {
    const { ingredientId } = useParams();
    const data = useSelector(ingredientsSelector)  as TIngredient[];
    const currentItem = useSelector(currentIngridientSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!data) {
            dispatch<any>(getIngredientsData());
        }
        if (data) {
            dispatch<any>(currentActionCreator.setCurrentIngridient(
                data.find(element => element._id === ingredientId)));
        }
    }, [data, ingredientId, dispatch]);

    return (
        <>
            {currentItem &&
                <div className={`${styles.wrapper} mt-25`}>
                    <h1 className='text text_type_main-medium mb-2'>Детали ингредиента</h1>
                    <IngredientDetails />
                </div>
            }
        </>
    );
}

export default IngredientsDetailsPage;