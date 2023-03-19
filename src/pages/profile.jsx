import { NavLink, Outlet} from 'react-router-dom'
import styles from './profile.module.css';

const ProfilePage = () => {
    return (
        <section className={`${styles.wrapper} mt-25`}>
            <div className={styles.navigation}>
                <NavLink end
                    to='/profile' 
                    className={({ isActive, isPending }) =>
                        isPending ? `text text_type_main-medium pt-4 pb-4 ` :
                            isActive ? `text text_type_main-medium pt-4 pb-4 ${styles.isActive}` :
                                `text text_type_main-medium pt-4 pb-4 ${styles.isNotActive}`
                    }
                >Профиль</NavLink>
                <NavLink
                    to='/profile/orders'
                    className={({ isActive, isPending }) =>
                        isPending ? `text text_type_main-medium pt-4 pb-4 ` :
                            isActive ? `text text_type_main-medium pt-4 pb-4 ${styles.isActive}` :
                                `text text_type_main-medium pt-4 pb-4 ${styles.isNotActive}`
                    }
                >История заказов</NavLink>
                <NavLink
                    to='/profile/logout'
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