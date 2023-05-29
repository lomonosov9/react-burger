import { useSelector } from '../../../services/hooks';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ingredientsSelector, requestSelector, failedSelector } from "../../../services/selectors";
import BurgerIngredients from '../../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import styles from './main.module.css';

const Main: React.FC = () => {
    const hasError = useSelector(failedSelector);
    const isLoading = useSelector(requestSelector);
    const data = useSelector(ingredientsSelector);

    return (
        <div className={styles.wrapper}>
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            {!isLoading &&
                !hasError &&
                data.length &&

                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            }
        </div>
    )
}

export default Main;