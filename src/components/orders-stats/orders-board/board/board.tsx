import styles from './board.module.css'

type BoardProps = {
    title: string;
    items: ReadonlyArray<number>;
    extraClass?: string
}

const Board: React.FC<BoardProps> = ({ title, items, extraClass = "" }) => {
    return (
        <div className={styles.container}>
            <span className='text text_type_main-medium mb-6'>{title}</span>
            <ul className={styles.list}>
                {items.map((elem, index) =>
                    <li className={`text text_type_digits-default ${extraClass}`} key={index}>
                        {elem.toString().padStart(6, '0')}
                    </li>
                )
                }
            </ul>
        </div>
    )
}

export default Board;