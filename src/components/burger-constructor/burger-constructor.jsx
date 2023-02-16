import styles from './burger-constructor.module.css';
import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { DataContext } from '../../services/data-context';
import { getOrder } from '../../utils/burger-api';
//import { string } from 'prop-types';



const costInitialState = { payload: 0 };

function costReducer(state, action) {
  switch (action.type) {
    case "set":
      return { payload: action.payload };
    default:
      throw new Error(`wrong type of action ${action.type}`);
  }
}

function BurgerConstructor() {

  const sectionClassName = classNames(styles.section, 'pt-25');
  const componentClassName = classNames(styles.component, 'ml-4 mr-4');
  const componentsInfoClassName = classNames(styles.componentsInfo, 'ml-4 mt-10 mr-4');

  const [costState, costDispatcher] = React.useReducer(costReducer, costInitialState, undefined);
  const [order, setOrder] = React.useState(null);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const data    = React.useContext(DataContext);
  const bun     = React.useMemo(() => data.filter(item => (item.type === 'bun'))[0], [data]);
  const filling = React.useMemo(() => data.filter(item => (item.type !== 'bun')).sort(() => 0.5 - Math.random()).slice(0,5), [data]);
  const getBurgerCost = React.useMemo(() => bun.price * 2 + filling.reduce((acc, obj) => acc + obj.price, 0),
    [bun, filling]);

  React.useEffect(() => {
    costDispatcher({ type: "set", payload: getBurgerCost });
  }, [getBurgerCost]);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleOpenModal = React.useCallback(async () => {
    setModalIsOpen(true);
    try {
      setIsLoading(true);
      const orderInfo = await getOrder(data.map(item => item._id));
      setOrder(orderInfo?.order.number);
      setIsLoading(false);
    }
    catch {
      setHasError(true);
    }
  }, [data]);

  const handleCLoseModal = () => { setModalIsOpen(false); }

  return (
    <section className={sectionClassName}>

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

      <div className={styles.innerComponentsList}>
        {
          filling.map(item => (
            <div className={componentClassName} key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))
        }
      </div>

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

      <div className={componentsInfoClassName}>
        <span className='pr-10'>
          <span className='pr-2 text text_type_digits-medium'>
            {costState.payload}
          </span>
          <CurrencyIcon type="primary" />
        </span>

        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
      </div>

      {
        modalIsOpen && !hasError && !isLoading && order &&

        <Modal isOpen={modalIsOpen} onClose={handleCLoseModal} header={''}>
          <OrderDetails orderNumber={order} />
        </Modal>
      }

      {
        modalIsOpen && hasError &&

        <Modal isOpen={modalIsOpen} onClose={handleCLoseModal} header={''}>
          <p className='text text_type_main-small'>Произошла ошибка.</p>
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;