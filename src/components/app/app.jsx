import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles            from './app.module.css';
import AppHeader         from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DataContext }   from '../../services/data-context';
import { dataSelector, requestSelector, failedSelector } from "../../services/selectors";
import { getIngredientsData } from "../../services/thunks";

const App = () => {
  const dispatch = useDispatch();

  const hasError  = useSelector(failedSelector);
  const isLoading = useSelector(requestSelector);
  const data      = useSelector(dataSelector);

  useEffect(() => {
     // Отправляем экшен-функцию
     dispatch(getIngredientsData());
  }, [dispatch]);

  return (
    <>
      <AppHeader></AppHeader>

      <main className={styles.main}>
        <div className={styles.wrapper}>

          {isLoading && 'Загрузка...'}
          {hasError && 'Произошла ошибка'}
          {!isLoading &&
            !hasError &&
            data.length &&
            <>
              <DataContext.Provider value={data}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </DataContext.Provider>
            </>
          }

        </div>
      </main>
    </>
  );
}

export default App;