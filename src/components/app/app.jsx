import styles from './app.module.css'
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import data from '../../utils/data';

function App() {
  return (
    <>
      <AppHeader></AppHeader>

      <main className={styles.main}>
        <div className={styles.wrapper}>
          
            <BurgerIngredients data={data}></BurgerIngredients>
            <BurgerConstructor></BurgerConstructor>
         
        </div>
      </main>
    </>
  );
}

export default App;
