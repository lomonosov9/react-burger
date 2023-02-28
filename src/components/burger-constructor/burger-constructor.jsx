import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import uuid from 'react-uuid';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {  CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import classNames from 'classnames';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { orderSelector, orderRequestSelector, orderFailedSelector, dataSelector } from '../../services/selectors';
import { bunSelector, costSelector } from '../../services/selectors';
import { getOrderInfo } from '../../services/thunks';
import { actionCreators } from '../../services/actionCreators';
import FillingList from './filling-list/filling-list';


function BurgerConstructor() {

  const sectionClassName = classNames(styles.section, 'pt-25');
  const componentClassName = classNames(styles.component, 'ml-4 mr-4');
  const componentsInfoClassName = classNames(styles.componentsInfo, 'ml-4 mt-10 mr-4');

  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const order = useSelector(orderSelector);
  const hasError = useSelector(orderFailedSelector);
  const isLoading = useSelector(orderRequestSelector);
  const bun = useSelector(bunSelector);
   const reduxCost = useSelector(costSelector);

  const initBun = React.useMemo(() => data.filter(item => (item.type === 'bun'))[0], [data]);
  React.useEffect(() => {
    //onMount - загружать в пустой бургер булочку
    if (!Object.keys(bun).length) {
      dispatch(actionCreators.addComponent(initBun));
    }
  }, [bun, dispatch, initBun]);

  const handleOpenModal = React.useCallback(async () => {
    dispatch(getOrderInfo(data.map(item => item._id)));
  }, [data, dispatch]);

  const handleCLoseModal = () => { 
    dispatch(actionCreators.resetOrder());
    dispatch(actionCreators.resetComponents());
  }

  // drop
  // Получаем реф, который мы пробросим в наш контейнер
  // чтобы библиотека могла манипулировать его состоянием
  const [{ isHover }, dropTargerRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(
        actionCreators.addComponent({
          ...item,
          // чтобы дублирующиеся ингредиенты в бургере не скакали при перетаскивании
          // так как реакт будет менять ингредиенты местами с учетом key
          // и именно в key мы будем пробрасывать наш dragId
          dragId: uuid()
        })
      )
    }
  });

  return (
    <section className={sectionClassName} ref={dropTargerRef} /* className={`${isHover ? styles.onHover : ''}`}*/ >
      {bun &&
        <div className={componentClassName}>
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
      <div className={styles.innerComponentsList}>
        <FillingList />
        {
        
        /*
          filling?.map(item => (
            <div className={componentClassName} key={item.dragId}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose = {() => handleItemDelete(item.dragId)}
              />
            </div>
          ))*/
        }
      </div>

      {bun &&
        <div className={componentClassName}>
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
      <div className={componentsInfoClassName}>
        <span className='pr-10'>
          <span className='pr-2 text text_type_digits-medium'>
            {reduxCost}
          </span>
          <CurrencyIcon type="primary" />
        </span>

        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
      </div>

      {
        !hasError && !isLoading && order?.number>0 &&
        
        <Modal isOpen={!hasError && !isLoading && order?.number>0 ? true:false} onClose={handleCLoseModal} header={''}>
          <OrderDetails orderNumber={order?.number} />
        </Modal>
      }
      {
        hasError &&

        <Modal isOpen={hasError ? true:false} onClose={handleCLoseModal} header={''}>
          <p className='text text_type_main-small'>Произошла ошибка.</p>
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;