import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import AppHeader from '../app-header/AppHeader';
import { getIngredientsData, checkUserAuth } from "../../services/thunks";
import Main from './main/main';
import styles from './app.module.css';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import LogoutPage from '../../pages/logout';
import ProtectedRouteElement from '../protected-route';
import IngredientsDetailsPage from '../../pages/ingredients-details';
import { constructorActionCreator, currentActionCreator, orderActionCreator } from '../../services/action-creators';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { currentIngridientSelector, orderSelector } from '../../services/selectors';
import NotFound404 from '../../pages/not-found';
import OrderDetails from '../burger-constructor/order-details/order-details';
import ProfileInfo from '../profile/info/profile-info';
import ProfileOrders from '../profile/orders/profile-orders';
import ProfileLogout from '../profile/logout/profile-logout';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getIngredientsData());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const ModalRouter = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;

    const handleCLoseIngredientsModal = () => {
      dispatch(currentActionCreator.resetCurrentIngridient());
      navigate(-1);
    };

    const handleCLosOrderModal = () => {
      dispatch(orderActionCreator.resetOrder());
      dispatch(constructorActionCreator.resetComponents());
      navigate(-1);
    }

    const currentIngredient = useSelector(currentIngridientSelector);
    const order = useSelector(orderSelector);

    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <div className={styles.wrapper}>

            <Routes location={background || location}>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={
                <ProtectedRouteElement onlyUnAuth element={<LoginPage />} />
              } />
              <Route path="/register" element={
                <ProtectedRouteElement onlyUnAuth element={<RegisterPage />} />
              } />
              <Route path="/forgot-password" element={
                <ProtectedRouteElement onlyUnAuth element={<ForgotPasswordPage />} />
              } />
              <Route path="/reset-password" element={
                <ProtectedRouteElement onlyUnAuth element={<ResetPasswordPage />} />
              } />

              <Route path="/profile" element={
                <ProtectedRouteElement element={<ProfilePage />} />
              }>
                  <Route path="/profile" element={<ProfileInfo />} />
                  <Route path="/profile/orders" element={<ProfileOrders />} />
                  <Route path="/profile/logout" element={<ProfileLogout />} />
                </Route>

              <Route path='/ingredients/:ingredientId' element={<IngredientsDetailsPage />} />
              <Route path="*" element={<NotFound404 />} />
            </Routes>

            {background && (
              <Routes>
                <Route path='/ingredients/:ingredientId'
                  element={
                    <Modal isOpen={currentIngredient ? true : false} onClose={handleCLoseIngredientsModal} header={'Детали ингредиента'}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route path='/profile/orders/:orderNumber'
                  element={
                    <ProtectedRouteElement element={
                      <Modal isOpen={order?.number >0 ? true : false} onClose={handleCLosOrderModal} header={''}>
                        <OrderDetails />
                      </Modal>
                    } />
                  } />
              </Routes>
            )}

          </div>
        </main>
      </>
    );
  }

  return (
    <ModalRouter />
  )
}

export default App;