import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import styles from './not-found.module.css';

const NotFound404 = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className='text text_type_main-medium mb-2'>Упс! Ошибка 404</h1>
            <p className="text text_type_main-default mb-10">Такой страницы не существует.</p>
            <p className="text text_type_main-default mb-10">
                Проверьте адрес или перейдите на 
                <Link to={ROUTES.CONSTRUCTOR}><span className="text text_type_main-default text_color_primary"> Главную</span></Link>
            </p>
        </div>
    );
}

export default NotFound404;