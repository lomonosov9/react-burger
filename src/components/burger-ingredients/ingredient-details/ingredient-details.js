import styles from './ingredient-details.module.css';
import classNames from 'classnames';
import ingredientType from '../../../utils/prop-types';


const IngredientDetails = (props) => {
    let itemClassName = classNames(styles.item);
    let itemImgClassName = classNames(styles.itemImg);
    let itemNameClassName = classNames(styles.itemName, 'text text_type_main-medium');
    let itemNutritionalClassName = classNames(styles.itemNutritional, 'mt-4 text');
    let nutritionTitle = classNames('text text_type_main-default text_color_inactive pb-3');
    let nutritionValue = classNames('text text_type_digits-default text_color_inactive');
    return (
        <article className={itemClassName} >
            <img
                alt=''
                src={props.image_large}
                className={itemImgClassName}
            />
            <p className={itemNameClassName}>
                {props.name}
            </p>

            <ul className={itemNutritionalClassName}>
                <li className='text'>
                    <p className={nutritionTitle}>Калории,ккал</p>
                    <p className={nutritionValue}> {props.calories}</p>
                </li>
                <li>
                    <p className={nutritionTitle}>Белки, г</p>
                    <p className={nutritionValue}> {props.proteins}</p>
                </li>
                <li>
                    <p className={nutritionTitle}>Жиры, г</p>
                    <p className={nutritionValue}> {props.fat}</p>
                </li>
                <li>
                    <p className={nutritionTitle}>Углеводы, г</p>
                    <p className={nutritionValue}> {props.carbohydrates}</p>
                </li>
            </ul>

        </article>
    );
}

IngredientDetails.propTypes = {ingredientType};

export default IngredientDetails;