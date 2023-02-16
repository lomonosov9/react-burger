import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/burger-api'
import { DataContext } from '../../services/data-context';

const App = () => {
  const [data, setData] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const getIngredientsData = async () => {
      try {
        const data = await getIngredients();
        setData(data.data);
        setIsLoading(false);
      }
      catch (e) {
        setHasError(true);
      };
    };

    getIngredientsData();
  }, []);

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
                <BurgerIngredients></BurgerIngredients>
                <BurgerConstructor></BurgerConstructor>
              </DataContext.Provider>
            </>
          }

        </div>
      </main>
    </>
  );
}

export default App;