import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrop } from "react-dnd";
import type { Identifier } from 'dnd-core';
import uuid from 'react-uuid';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import classNames from 'classnames';
import { orderSelector, orderRequestSelector, orderFailedSelector, isAuthorizedSelector } from '../../services/selectors';
import { bunSelector, fillingSelector, costSelector } from '../../services/selectors';
import { getOrderInfo } from '../../services/thunks';
import { constructorActionCreator, orderActionCreator } from '../../services/action-creators';
import FillingList from './filling-list/filling-list';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeReplacePathParams, ROUTES } from '../../utils/routes';
import { TComponent, TIngredient } from '../../services/types/data';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';


function BurgerConstructor() {

  const sectionClassName = classNames(styles.section, 'pt-25');
  const componentClassName = classNames(styles.component, 'ml-4 mr-4');
  const componentsInfoClassName = classNames(styles.componentsInfo, 'ml-4 mt-10 mr-4');

  const dispatch = useDispatch();
  const filling = useSelector(fillingSelector) as TComponent[];
  const order = useSelector(orderSelector) as { name: string, number: number };
  const hasError = useSelector(orderFailedSelector);
  const isLoading = useSelector(orderRequestSelector);
  const bun = useSelector(bunSelector);
  const reduxCost = useSelector(costSelector);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useSelector(isAuthorizedSelector);

  const dispatchOrderInfo = React.useCallback(async () => {
    if (bun?._id) {
      const componentsIds = [bun?._id, ...filling.map(item => item._id), bun?._id];
      dispatch(getOrderInfo(componentsIds));
    }

  }, [bun, filling, dispatch]);

  const handleOpenModal = async () => {
    if (!isAuthorized) {
      navigate(ROUTES.LOGIN, { state: { from: location } })
    }
    else {
      dispatchOrderInfo();
    }
  }

  // drop
  // Получаем реф, который мы пробросим в наш контейнер
  // чтобы библиотека могла манипулировать его состоянием
  const [{ isHover }, dropTargerRef] = useDrop<TIngredient, void, { isHover: boolean }>({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(
        constructorActionCreator.addComponent({
          ...item,
          // чтобы дублирующиеся ингредиенты в бургере не скакали при перетаскивании
          // так как реакт будет менять ингредиенты местами с учетом key
          // и именно в key мы будем пробрасывать наш dragId
          dragId: uuid()
        })
      )
    }
  });

  const handleCLosOrderModal = () => {
    dispatch(orderActionCreator.resetOrder());
    dispatch(constructorActionCreator.resetComponents());
  }

  return (
    <section className={sectionClassName} ref={dropTargerRef} data-test="constructor" /* className={`${isHover ? styles.onHover : ''}`}*/ >
      {isLoading &&
        <div>
          <p className="text text_type_main-default">Ожидайте, ваш заказ оформляется... </p>
        </div>
      }
      {
        order && order?.number > 0 &&
        <Modal isOpen={order?.number > 0 ? true : false} onClose={handleCLosOrderModal} header={''}>
            <OrderDetails />
        </Modal>
      }
      {
        <>
          {!isLoading &&
            <>
              {bun &&
                <div className={componentClassName} data-test="bun-top">
                  <span style={{ width: 24 }} />
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                </div>
              }
              <div className={`${styles.innerComponentsList} custom-scroll`} data-test="filling-container">
                <FillingList />
              </div>

              {bun &&
                <div className={componentClassName} data-test="bun-bottom">
                  <span style={{ width: 24 }} />
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                </div>
              }
            </>
          }


          <div className={componentsInfoClassName}>
            <span className='pr-10'>
              <span className='pr-2 text text_type_digits-medium'>
                {reduxCost}
              </span>
              <CurrencyIcon type="primary" />
            </span>

            <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal} disabled={(!bun || isLoading) ? true : false} data-test="order-button">Оформить заказ</Button>
          </div>

          {hasError &&
            <div>
              <p className="text text_type_main-default text_color_error">Произошла ошибка. </p>
            </div>
          }
        </>
      }
    </section>
  );
}

export default BurgerConstructor;