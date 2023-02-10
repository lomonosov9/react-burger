import React, { useMemo } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
//import dataStatic from '../../utils/data';

const App = () => {
  const dataURL = 'https://norma.nomoreparties.space/api/ingredients';
  const [data, setData] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const getAsyncData = useMemo(async () => {
    try {
      const res = await fetch(dataURL);
      const resJSON = await res.json();
      return resJSON.data;
    }
    catch (e) { throw Error(e); }
  }, []);


  React.useEffect(() => {
    const getIngredients = async () => {
      try {
        const data = await getAsyncData;
        setData(data);
        setIsLoading(false);
      }
      catch (e) {
        setHasError(true);
      };
    };

    getIngredients();
  }, [getAsyncData]);

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
              <BurgerIngredients data={data}></BurgerIngredients>
              <BurgerConstructor></BurgerConstructor>
            </>
          }

        </div>
      </main>
    </>
  );
}

export default App;