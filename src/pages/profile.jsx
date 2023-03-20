import { NavLink, Outlet} from 'react-router-dom'
import { ROUTES } from '../utils/routes';
import styles from './profile.module.css';

const ProfilePage = () => {
    return (
        <section className={`${styles.wrapper} mt-25`}>
            <div className={styles.navigation}>
                <NavLink end
                    to={ROUTES.PROFILE} 
                    className={({ isActive, isPending }) =>
                        isPending ? `text text_type_main-medium pt-4 pb-4 ` :
                            isActive ? `text text_type_main-medium pt-4 pb-4 ${styles.isActive}` :
                                `text text_type_main-medium pt-4 pb-4 ${styles.isNotActive}`
                    }
                >Профиль</NavLink>
                <NavLink
                    to={ROUTES.PROFILE_ORDERS}
                    className={({ isActive, isPending }) =>
                        isPending ? `text text_type_main-medium pt-4 pb-4 ` :
                            isActive ? `text text_type_main-medium pt-4 pb-4 ${styles.isActive}` :
                                `text text_type_main-medium pt-4 pb-4 ${styles.isNotActive}`
                    }
                >История заказов</NavLink>
                <NavLink
                    to={ROUTES.PROFILE_LOGOUT}
                    className={({ isActive, isPending }) =>
                        isPending ? `text text_type_main-medium pt-4 pb-4 ` :
                            isActive ? `text text_type_main-medium pt-4 pb-4 ${styles.isActive}` :
                                `text text_type_main-medium pt-4 pb-4 ${styles.isNotActive}`
                    }
                >Выход</NavLink>

                <span className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете
                    изменить свои персональные данные</span>
            </div>

            <Outlet />
            
        </section>
    );
}

export default ProfilePage;