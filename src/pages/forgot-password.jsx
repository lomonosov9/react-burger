import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    passwordRecoverRequestSelector, passwordRecoverSuccessSelector,
    passwordRecoverFailedSelector, passwordRecoverErrorSelector
} from '../services/selectors';
import { passwordRecoverData } from '../services/thunks';
import styles from './forgot-password.module.css';

const ForgotPasswordPage = () => {
    const [form, setForm] = useState({ email: '' });
    const dispatch = useDispatch();
    const isLoading = useSelector(passwordRecoverRequestSelector);
    const hasError = useSelector(passwordRecoverFailedSelector);
    const errorMessage = useSelector(passwordRecoverErrorSelector);
    const passwordRecoverSuccess = useSelector(passwordRecoverSuccessSelector);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(passwordRecoverData(form));
    }

    return (
        <>
            {   passwordRecoverSuccess && <Navigate to={'/reset-password'} />  }
            {  !passwordRecoverSuccess &&
                <div className={styles.wrapper}>
                    <h1 className='text text_type_main-medium mb-2'>Восстановление пароля {isLoading && '...'}</h1>
                    <form onSubmit={handleSubmit}>
                        <EmailInput
                            onChange={onChange}
                            value={form.email}
                            name={'email'}
                            placeholder="Укажите e-mail"
                            extraClass="mb-2"
                        />
                        <Button htmlType="submit" type="primary" size="large" extraClass={styles.button}>
                            Восстановить
                        </Button>
                    </form>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? </span>
                        <Link to='/login'><span className="text text_type_main-default">Войти</span></Link>
                    </div>
                    <div>
                        {hasError &&
                            <>
                                <p className="text text_type_main-default text_color_error">Ошибка восстановления пароля: </p>
                                <p className="text text_type_main-default text_color_error">{errorMessage}</p>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default ForgotPasswordPage;