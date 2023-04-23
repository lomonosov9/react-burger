import { useState } from "react";
import { Link } from 'react-router-dom'
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    passwordResetRequestSelector, passwordResetSuccessSelector,
    passwordResetFailedSelector, passwordResetErrorSelector,
    passwordRecoverSuccessSelector
} from '../services/selectors';
import { passwordResetData } from '../services/thunks';
import styles from './reset-password.module.css';
import { ROUTES } from "../utils/routes";
import { useForm } from "../hooks/useForm";

const ResetPasswordPage = () => {
    const {form, handleChange} = useForm({ password: '', token: '' });

    const dispatch               = useDispatch();
    const isLoading              = useSelector(passwordResetRequestSelector);
    const hasError               = useSelector(passwordResetFailedSelector);
    const errorMessage           = useSelector(passwordResetErrorSelector);
    const passwordResetSuccess   = useSelector(passwordResetSuccessSelector);
    const passwordRecoverSuccess = useSelector(passwordRecoverSuccessSelector);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch<any>(passwordResetData(form));
    }

    return (
        <>
            {(!passwordRecoverSuccess || passwordResetSuccess) && <Navigate to={ROUTES.LOGIN} />}
            {!passwordResetSuccess &&
                <div className={styles.wrapper}>
                    <h1 className='text text_type_main-medium mb-2'>Восстановление пароля {isLoading && '...'}</h1>
                    <form onSubmit={handleSubmit}>
                        <PasswordInput
                            onChange={handleChange}
                            value={form?.password || ''}
                            name={'password'}
                            placeholder={"Введите новый пароль"}
                            extraClass="mb-2"
                            noValidate={true}
                        />
                        <Input
                            onChange={handleChange}
                            value={form?.token || ''}
                            name={'token'}
                            placeholder="Введите код из письма"
                            extraClass="mb-2"
                        />
                        <Button htmlType="submit" type="primary" size="large" extraClass={styles.button}>
                            Сохранить
                        </Button>
                    </form>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? </span>
                        <Link to={ROUTES.LOGIN}><span className="text text_type_main-default">Войти</span></Link>
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

export default ResetPasswordPage;