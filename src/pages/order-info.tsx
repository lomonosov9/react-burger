import styles from './order-info.module.css';
import OrderInfo from '../components/orders/order-info/order-info';

const OrderInfoPage = () => {
    return (
        <div className={`${styles.wrapper} mt-25`}>
            <h1 className='text text_type_main-medium'>#002456</h1>
            <OrderInfo />
        </div>
    );
}

export default OrderInfoPage;