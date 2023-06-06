import Completed from './completed/completed';
import OrdersBoard from './orders-board/orders-board';
import styles from './orders-stats.module.css';

type OrdersStatsProps = {
    total: number;
    totalToday: number;
    doneNums: ReadonlyArray<number>;
    pendingNums: ReadonlyArray<number>;
}
const OrdersStats: React.FC<OrdersStatsProps> = ({total, totalToday, doneNums, pendingNums}) =>{
    return (
        <section className={`${styles.section} custom-scroll`} >
            <OrdersBoard done={doneNums} pending={pendingNums}/>
            <Completed title='Выполнено за все время:' quantity={total}/>
            <Completed title='Выполнено за сегодня:' quantity={totalToday}/>
        </section>
    )
}

export default OrdersStats;