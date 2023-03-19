import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { userRequestSelector, userFailedSelector, isAuthorizedSelector, userErrorSelector } from '../services/selectors';
import { registerUserData } from '../services/thunks';
import styles from './register.module.css';

const RegisterPage = () => {
    const [form, setForm] = useState({name: '',  email: '',  password: ''});

    const isLoading    = useSelector(userRequestSelector);
    const hasError     = useSelector(userFailedSelector);
    const errorMessage = useSelector(userErrorSelector);
    const isAuthorized = useSelector(isAuthorizedSelector);    

    const dispatch = useDispatch();

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUserData(form));
    }

    return (
        <>
            {
                isAuthorized && <Navigate to={'/'} />
            }        
            {!isAuthorized &&
                <div className={styles.wrapper}>
                    <h1 className='text text_type_main-medium mb-2'>Регистрация {isLoading && '...'}</h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            onChange={onChange}
                            value={form.name}
                            name={'name'}
                            placeholder="Имя"
                            extraClass="mb-2"
                        />
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
                        <Button htmlType="submit" type="primary" size="large" extraClass={styles.button} >
                            Зарегистрироваться
                        </Button>
                    </form>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы? </span>
                        <Link to='/login'><span className="text text_type_main-default">Войти</span></Link>
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

export default RegisterPage;