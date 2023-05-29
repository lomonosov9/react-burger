import Board from './board/board';
import styles from './orders-board.module.css'

type OrdersBoardProps = {
    done: ReadonlyArray<number>;
    pending: ReadonlyArray<number>;
}
const OrdersBoard: React.FC<OrdersBoardProps> = ({ done, pending }) => {
    return (
        <div className={styles.container}>
            <Board title='Готовы: ' items={done} extraClass='text_color_success' />
            <Board title='В работе: ' items={pending} />
        </div>
    )
}

export default OrdersBoard;