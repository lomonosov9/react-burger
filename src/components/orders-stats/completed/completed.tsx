import styles from './completed.module.css'

type CompletedProps = {
    title: string;
    quantity: number;
}

const Completed: React.FC<CompletedProps> = ({title, quantity}) => {

    return (
        <div className={styles.container}> 
            <span className='text text_type_main-medium'>{title}</span>
            <span className='text text_type_digits-large'>{quantity}</span>
        </div>
    )
}

export default Completed;