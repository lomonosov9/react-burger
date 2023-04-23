import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { userRequestSelector, userFailedSelector, userErrorSelector } from '../../../services/selectors';
import { logoutUserData } from "../../../services/thunks";
import styles from './profile-logout.module.css';

const ProfileLogout: React.FC = () => {

    const isLoading = useSelector(userRequestSelector);
    const hasError = useSelector(userFailedSelector);
    const errorMessage = useSelector(userErrorSelector);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch<any>(logoutUserData());
    }, [dispatch]);


    return (
        <div className={styles.form}>
            <h1 className='text text_type_main-medium mb-2'>Выход из системы {isLoading && '...'}</h1>
            <div>
                {hasError &&
                    <>
                        <p className="text text_type_main-default text_color_error">Ошибка выхода из системы: </p>
                        <p className="text text_type_main-default text_color_error">{errorMessage}</p>
                    </>
                }
            </div>
        </div>
    );
}

export default ProfileLogout;