import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { Routes, Route, useLocation, useNavigate, useParams, useNavigationType, NavigationType } from 'react-router-dom';

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
import OrderFeedPage from '../../pages/order-feed';
import OrderInfoPage from '../../pages/order-info';
import OrderInfo from '../orders/order-info/order-info';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getIngredientsData());
    dispatch(checkUserAuth());
    // eslint-disable-next-line
  }, []);

  const ModalRouter: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    
    const background = location.state && location.state.background;
    //если через Link state переданы какие-то данные
    const payload = location.state && location.state.payload;
    
    const handleCLoseIngredientsModal = () => {
      dispatch(currentActionCreator.resetCurrentIngridient());
      navigate(-1);
    };

    const handleCLoseOrderInfoModal = () => {
      navigate(-1);
    };

    const currentIngredient = useSelector(currentIngridientSelector);


    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.main}>
          <div className={styles.wrapper}>

            <Routes location={background || location}>
              <Route path={ROUTES.CONSTRUCTOR} element={<Main />} />
              <Route path={ROUTES.FEED} element={<OrderFeedPage />} />
              <Route path={ROUTES.FEED_ORDER} element={<OrderInfoPage />} />
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
                <Route path={ROUTES.PROFILE} element={<ProfileInfo />} />
                <Route path={ROUTES.PROFILE_LOGOUT} element={<ProfileLogout />} />
                <Route path={ROUTES.PROFILE_ORDERS} element={<ProfileOrders />} />
                <Route path={ROUTES.PROFILE_FEED_ORDER} element={<OrderInfoPage />} />

              </Route>

              <Route path={ROUTES.INGREDIENT} element={<IngredientsDetailsPage />} />
              <Route path="*" element={<NotFound404 />} />
            </Routes>

            {background && navigationType === NavigationType.Push && (
              <Routes>
                <Route path={ROUTES.INGREDIENT}
                  element={
                    <Modal isOpen={currentIngredient ? true : false} onClose={handleCLoseIngredientsModal} header={'Детали ингредиента'}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route path={ROUTES.FEED_ORDER}
                  element={
                    <Modal isOpen={true} header={payload?.toString()} onClose={handleCLoseOrderInfoModal}>
                      <OrderInfo />
                    </Modal>
                  }
                />
                <Route path={ROUTES.PROFILE_FEED_ORDER}
                  element={
                    <Modal isOpen={true} header={payload?.toString()} onClose={handleCLoseOrderInfoModal}>
                      <OrderInfo />
                    </Modal>
                  }
                />
              </Routes>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <ModalRouter />
  )
}

export default App;