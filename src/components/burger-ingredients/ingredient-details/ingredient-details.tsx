import styles from './ingredient-details.module.css';
import classNames from 'classnames';
import { currentIngridientSelector } from '../../../services/selectors';
import { useSelector } from 'react-redux';


const IngredientDetails: React.FC = () => {
    const currentItem = useSelector(currentIngridientSelector);

    const itemClassName = classNames(styles.item);
    const itemImgClassName = classNames(styles.itemImg);
    const itemNameClassName = classNames(styles.itemName, 'text text_type_main-medium');
    const itemNutritionalClassName = classNames(styles.itemNutritional, 'mt-4 text');
    const nutritionTitle = classNames('text text_type_main-default text_color_inactive pb-3');
    const nutritionValue = classNames('text text_type_digits-default text_color_inactive');


    return (<>
        {currentItem &&
            <article className={itemClassName} >
                <img
                    alt=''
                    src={currentItem.image_large}
                    className={itemImgClassName}
                />
                <p className={itemNameClassName}>
                    {currentItem.name}
                </p>

                <ul className={itemNutritionalClassName}>
                    <li className='text'>
                        <p className={nutritionTitle}>Калории,ккал</p>
                        <p className={nutritionValue}> {currentItem.calories}</p>
                    </li>
                    <li>
                        <p className={nutritionTitle}>Белки, г</p>
                        <p className={nutritionValue}> {currentItem.proteins}</p>
                    </li>
                    <li>
                        <p className={nutritionTitle}>Жиры, г</p>
                        <p className={nutritionValue}> {currentItem.fat}</p>
                    </li>
                    <li>
                        <p className={nutritionTitle}>Углеводы, г</p>
                        <p className={nutritionValue}> {currentItem.carbohydrates}</p>
                    </li>
                </ul>
            </article>
        }
    </>
    );
}
export default IngredientDetails;