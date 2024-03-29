import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { Link } from 'react-router-dom'
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { userRequestSelector, userFailedSelector, isAuthorizedSelector, userErrorSelector } from '../services/selectors';
import { registerUserData } from '../services/thunks';
import styles from './register.module.css';
import { ROUTES } from "../utils/routes";
import { useForm } from "../hooks/useForm";

const RegisterPage = () => {
    const {form, handleChange} = useForm({name: '',  email: '',  password: ''});

    const isLoading    = useSelector(userRequestSelector);
    const hasError     = useSelector(userFailedSelector);
    const errorMessage = useSelector(userErrorSelector);
    const isAuthorized = useSelector(isAuthorizedSelector);    

    const dispatch = useDispatch();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
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
                            onChange={handleChange}
                            value={form?.name || ''}
                            name={'name'}
                            placeholder="Имя"
                            extraClass="mb-2"
                        />
                        <EmailInput
                            onChange={handleChange}
                            value={form?.email || ''}
                            name={'email'}
                            placeholder="E-mail"    
                            extraClass="mb-2"
                        />
                        <PasswordInput
                            onChange={handleChange}
                            value={form?.password || ''}
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
                    <Link to={ROUTES.LOGIN}><span className="text text_type_main-default">Войти</span></Link>
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