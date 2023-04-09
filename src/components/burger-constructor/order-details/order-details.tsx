import React from 'react';
import styles from './order-details.module.css';
import checkedImgPath from '../../../images/checked-gradient.svg'
import { useSelector } from 'react-redux';
import { orderSelector } from '../../../services/selectors';

const OrderDetails: React.FC = () => {
    const order = useSelector(orderSelector);
    return (
        <>
            {order?.number > 0 &&
                <article className={styles.order} >
                    <p className='text text_type_digits-large mb-8'>
                        {order?.number}
                    </p>
                    <p className='text text_type_main-medium'>идентификатор заказа</p>
                    <div className='mt-15 mb-15 pb-2' style={{ height: 120 }}>
                        <img src={checkedImgPath} alt='OK' width='107' height='102' className='mt-2' />
                    </div>
                    <p className='text text_type_main-small mb-2'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
                </article>
            }
        </>
    );
}

export default OrderDetails;