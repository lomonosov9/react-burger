import { ingredientsSelector } from '../../../services/selectors';
import { TIngredient } from '../../../services/types/data';
import { ORDER_STATUS, ORDER_STATUS_TITLE } from '../../../utils/const';
import styles from './order-info.module.css'
import ComponentIcon from '../order-card/icons-list/component-icon/component-icon';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { feedSelector } from '../../../services/feed/selectors';
import { useDispatch, useSelector } from '../../../services/hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getFeedOrderInfo } from '../../../services/thunks';
import { orderInfoSelector } from '../../../services/selectors';

const OrderInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { orderNumber } = useParams();
  const orderNum = Number(orderNumber);
  const feed = useSelector(feedSelector);
  const ingredients = useSelector(ingredientsSelector) as TIngredient[];
  
  // ищем заказ в ленте веб сокета
  const feedOrder =  feed?.orders?.find(({ number }) => number === orderNum);
  const requestedOrder = useSelector(orderInfoSelector);
  //если не нашли в ленте - исп-м спец эндпоинт
  const order = feedOrder || requestedOrder;

  const orderIngredients = ingredients.filter(item => order?.ingredients.includes(item._id)) || null;
  const orderIngredientsCount = order?.ingredients.reduce<Record<string, number>>((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {}) || null;

  const getBurgerCost = () => {
    return orderIngredients?.reduce(
      (cnt, item) => cnt + item.price * (orderIngredientsCount !== null ? orderIngredientsCount[item._id] : 0)
      , 0);
  }

  useEffect(() => {
    if (!feedOrder && orderNum) {
      dispatch(getFeedOrderInfo(orderNum));
    }
  }, [orderNum]);

  return (
    <>
      {order &&
        <section className={`${styles.container} mt-10`} >
          <span className='text text_type_main-medium mb-3'>{order.name}</span>
          <span className={`text text_type_main-small mb-15 ${order.status === ORDER_STATUS.DONE && "text_color_success"}`}  >{ORDER_STATUS_TITLE[order.status]}</span>
          <span className='text text_type_main-medium mb-6'>Состав:</span>
          <div className={`${styles.components} custom-scroll mb-10`}>
            {orderIngredients?.map(item =>
              <div className={`${styles.component} text text_type_main-default mb-4 mr-6`} key={item._id}>
                {item.image_mobile &&
                  <ComponentIcon src={item.image_mobile} />
                }
                <span>{item?.name}</span>
                <span className={`${styles.price} text text_type_digits-default`}>
                  <span>{orderIngredientsCount !== null && orderIngredientsCount[item._id].toString()} x {item.price}</span>
                  <CurrencyIcon type="primary" />
                </span>
              </div>
            )
            }
          </div>
          <div className={styles.footer}>
            <span className='text text_type_main-default text_color_inactive'>
              {
                order?.createdAt && <FormattedDate date={new Date(order.createdAt)} />
              }
            </span>
            <span className={`${styles.price} text text_type_digits-default`}>
              <span>{getBurgerCost()}</span>
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </section>
      }
    </>
  )
}

export default OrderInfo;