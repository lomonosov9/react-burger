import { useEffect } from 'react';
import { TOrderInfo } from '../../services/types/data';
import OrderCard from './order-card/order-card';
import styles from './orders.module.css';
import { useMatch } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

type OrdersProps = {
    orders: ReadonlyArray<TOrderInfo>
}

const Orders:React.FC<OrdersProps> = ({orders}) =>{
    const matchProfile = useMatch(ROUTES.PROFILE_ORDERS) ? true : false;
    const ordersSorted = matchProfile 
        ? 
        orders.slice().sort((a,b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
        :
        orders;

    return (
        <section className={`${styles.section} custom-scroll`}>
            {
                ordersSorted.map(item => {
                    if (item._id && item?.ingredients.length>0 && item.number && item.status && item.createdAt && item.updatedAt){
                        return (<OrderCard  {...item} isProfile={matchProfile} key={item._id} />)
                    }
                })
            }
        </section>
    )
}

export default Orders;