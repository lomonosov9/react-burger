import styles from './order-details.module.css';
//import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import checkedImgPath from '../../../images/checked-gradient.svg'

const OrderDetails = ({orderNumber = '034536'}) => {
    return (
        <article className={styles.order} >
            <p className='text text_type_digits-large mb-8'>
                {orderNumber}
            </p>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <div className='mt-15 mb-15 pb-2' style={{height:120}}>
                <img src={checkedImgPath} alt='OK' width='107' height='102' className='mt-2'/>
            </div>
            <p className='text text_type_main-small mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
        </article>
    );
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
}

export default OrderDetails;