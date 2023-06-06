import { useEffect } from 'react';
import OrdersStats from '../components/orders-stats/orders-stats';
import Orders from '../components/orders/orders';
import { WebsocketStatus } from '../services/types/data';
import { ORDER_STATUS } from '../utils/const';
import styles from './order-feed.module.css';
import { useDispatch, useSelector } from '../services/hooks';
import { feedErrorSelector, feedSelector, feedStatusSelector } from '../services/feed/selectors';
import { connect } from '../services/feed/actions';
import { getFeedUrl, getProfileFeedUrl } from '../utils/burger-api';
import { disconnect } from '../services/feed/actions';


const OrderFeedPage = () => {
  const dispatch = useDispatch();

  const feed = useSelector(feedSelector);
  const feedStatus = useSelector(feedStatusSelector);
  const feedError = useSelector(feedErrorSelector);

  //здесь берем по 10 заказов из 50, чтобы не загромождать доску
  //если требутеся выводить все 50 - то колонки не входят в доступную ширину блока и появлятся скроллы
  const done = feed?.orders.filter(({ status }) => status === ORDER_STATUS.DONE).map(({ number }) => number).slice(0, 10) || [];
  const pending = feed?.orders.filter(({ status }) => status === ORDER_STATUS.PENDING).map(({ number }) => number).slice(0, 10) || [];

  useEffect(
    () => {
      dispatch(connect(getFeedUrl()));
      
      return () => {
            dispatch(disconnect());
      };
    }, [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className={`${styles.wrapper}`}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Лента заказов</h1>

      {feedStatus === WebsocketStatus.CONNECTING &&
        <p className="text text_type_main-default mb-10">Connecting...</p>
      }
      {feedStatus === WebsocketStatus.OFFLINE &&
        <p className="text text_type_main-default mb-10">Offline.</p>
      }
      {feedError &&
        <p className="text text_type_main-default mb-10">Произошла ошибка. {feedError}</p>
      }
      <div className={`${styles.container}`} >
        {feed &&
          feedStatus === WebsocketStatus.ONLINE &&
          !feedError &&
          feed.orders?.length > 0 &&
          <>
            <Orders orders={feed.orders.filter(item => !item.ingredients.some(elem => elem === null || elem === undefined))} />
            <OrdersStats total={feed.total} totalToday={feed.totalToday} doneNums={done} pendingNums={pending} />
          </>
        }
      </div>
    </div>
  );
}

export default OrderFeedPage;