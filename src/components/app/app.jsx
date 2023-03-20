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
import { ROUTES } from '../../utils/routes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getIngredientsData());
    dispatch(checkUserAuth());
    // eslint-disable-next-line
  }, []);

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
              <Route path={ROUTES.CONSTRUCTOR} element={<Main />} />
              <Route path={ROUTES.LOGIN} element={
                <ProtectedRouteElement onlyUnAuth element={<LoginPage />} />
              } />
              <Route path={ROUTES.REGISTER} element={
                <ProtectedRouteElement onlyUnAuth element={<RegisterPage />} />
              } />
              <Route path={ROUTES.FORGOT_PASSWORD} element={
                <ProtectedRouteElement onlyUnAuth element={<ForgotPasswordPage />} />
              } />
              <Route path={ROUTES.RESET_PASSWORD} element={
                <ProtectedRouteElement onlyUnAuth element={<ResetPasswordPage />} />
              } />

              <Route path={ROUTES.PROFILE} element={
                <ProtectedRouteElement element={<ProfilePage />} />
              }>
                  <Route path={ROUTES.PROFILE}        element={<ProfileInfo />} />
                  <Route path={ROUTES.PROFILE_ORDERS} element={<ProfileOrders />} />
                  <Route path={ROUTES.PROFILE_LOGOUT} element={<ProfileLogout />} />
                </Route>

              <Route path={ROUTES.INGREDIENT} element={<IngredientsDetailsPage />} />
              <Route path="*" element={<NotFound404 />} />
            </Routes>

            {background && (
              <Routes>
                <Route path={ROUTES.INGREDIENT}
                  element={
                    <Modal isOpen={currentIngredient ? true : false} onClose={handleCLoseIngredientsModal} header={'Детали ингредиента'}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route path={ROUTES.ORDER}
                  element={
                    <ProtectedRouteElement element={
                      <Modal isOpen={order?.number > 0 ? true : false} onClose={handleCLosOrderModal} header={''}>
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