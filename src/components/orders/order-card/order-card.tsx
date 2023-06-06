import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css'
import { TIngredient, TOrderInfo } from '../../../services/types/data';
import { ingredientsSelector } from '../../../services/selectors';
import { useSelector } from '../../../services/hooks';
import IconsList from './icons-list/icons-list';
import { ORDER_STATUS, ORDER_STATUS_TITLE } from '../../../utils/const';
import { ROUTES, routeReplacePathParams } from '../../../utils/routes';
import { Link, useLocation } from 'react-router-dom';

type OrderCardProps = TOrderInfo & {
    isProfile: boolean
}

const OrderCard: React.FC<OrderCardProps> = ({ _id, name, number, status, ingredients, createdAt, updatedAt, isProfile }) => {
    const ingridientsList = useSelector(ingredientsSelector) as TIngredient[];
    const icons = ingridientsList.filter(({ _id }) => ingredients.includes(_id)).map(({ image_mobile }) => image_mobile) as string[];

    const orderIngredients = ingridientsList.filter(({ _id }) => ingredients.includes(_id)) || null;
    const orderIngredientsCount = ingredients.reduce<Record<string, number>>((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {}) || null;

    const getBurgerCost = () => {
        return orderIngredients?.reduce(
            (cnt, item) => cnt + item.price * (orderIngredientsCount !== null ? orderIngredientsCount[item._id] : 0)
            , 0);
    }

    const url = isProfile ? ROUTES.PROFILE_FEED_ORDER : ROUTES.FEED_ORDER;
    const pathToOrderInfo = routeReplacePathParams(url, { orderNumber: number });
    const location = useLocation();

    return (
        <Link
            key={_id}
            to={{
                pathname: pathToOrderInfo
            }}
            state={{
                background: location,
                //отправляем номер заказа для отображения в хедере модального окна
                payload: `#${number.toString().padStart(6, '0')}`
            }}
            className={styles.link}
        >

            <article className={styles.card}>
                <div className={styles.twoColumns}>
                    <span className='text text_type_digits-default'>
                        {`#${number.toString().padStart(6, '0')}`}
                    </span>
                    <span className='text text_type_main-default text_color_inactive'>
                        <FormattedDate date={new Date(createdAt)} />
                    </span>
                </div>
                <span className={`${styles.title} text text_type_main-medium`}>
                    {name}
                </span>
                {
                    isProfile &&
                    <div className={`${styles.status} text text_type_main-small mt-2`}>
                        <span className={status === ORDER_STATUS.DONE ? "text_color_success" : ""}>{ORDER_STATUS_TITLE[status]}</span>
                    </div>
                }
                <div className={styles.twoColumns}>
                    <div>
                        <IconsList icons={icons} />
                    </div>
                    <div className={styles.price}>
                        <span className='text text_type_digits-default pr-2'>{getBurgerCost()}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>

            </article>
        </Link>
    )
}

export default OrderCard;