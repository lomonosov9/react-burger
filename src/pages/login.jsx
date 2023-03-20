import { useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom'
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { userRequestSelector, userFailedSelector, isAuthorizedSelector, userErrorSelector } from '../services/selectors';
import { loginUserData } from '../services/thunks';
import styles from './login.module.css';
import { ROUTES } from "../utils/routes";

const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const isLoading = useSelector(userRequestSelector);
    const hasError = useSelector(userFailedSelector);
    const errorMessage = useSelector(userErrorSelector);
    const isAuthorized = useSelector(isAuthorizedSelector);

    const dispatch = useDispatch();
    const location = useLocation();

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUserData(form));
    }
    return (
        <>
            {
                isAuthorized && <Navigate to={location?.state?.from || ROUTES.CONSTRUCTOR} />
            }
            {!isAuthorized &&
                <div className={styles.wrapper}>
                    <h1 className='text text_type_main-medium mb-2'>Вход {isLoading && '...'}</h1>
                    <form onSubmit={handleSubmit}>
                        <EmailInput
                            onChange={onChange}
                            value={form.email}
                            name={'email'}
                            placeholder="E-mail"
                            extraClass="mb-2"
                        />
                        <PasswordInput
                            onChange={onChange}
                            value={form.password}
                            name={'password'}
                            placeholder={"Пароль"}
                            extraClass="mb-2"
                            noValidate={true}
                        />
                        <Button htmlType="submit" type="primary" size="large" extraClass={styles.button}>
                            Войти
                        </Button>
                    </form>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">Вы — новый пользователь? </span>
                        <Link to={ROUTES.REGISTER}><span className="text text_type_main-default">Зарегистрироваться</span></Link>
                    </div>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">Забыли пароль? </span>
                        <Link to={ROUTES.FORGOT_PASSWORD}><span className="text text_type_main-default">Восстановить пароль</span></Link>
                    </div>
                    <div>
                        {hasError &&
                            <>
                                <p className="text text_type_main-default text_color_error">Ошибка авторизации: </p>
                                <p className="text text_type_main-default text_color_error">{errorMessage}</p>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default LoginPage;