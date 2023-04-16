import styles from './ingredients-details.module.css';
import IngredientDetails from "../components/burger-ingredients/ingredient-details/ingredient-details";

const IngredientsDetailsPage = () => {
    return (
        <div className={`${styles.wrapper} mt-25`}>
            <h1 className='text text_type_main-medium mb-2'>Детали ингредиента</h1>
            <IngredientDetails />
        </div>
    );
}

export default IngredientsDetailsPage;