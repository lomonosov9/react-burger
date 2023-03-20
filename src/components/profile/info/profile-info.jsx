import { useEffect, useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile-info.module.css';
import { useDispatch, useSelector } from "react-redux";
import {
    userRequestSelector, userFailedSelector,
    userErrorSelector, userSelector
} from '../../../services/selectors';
import { updateUserData } from "../../../services/thunks";

const ProfileInfo = () => {

    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const isLoading = useSelector(userRequestSelector);
    const hasError = useSelector(userFailedSelector);
    const errorMessage = useSelector(userErrorSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateUserData(form));
    }

    useEffect(() => {
        if (user.name && user.email) {
            setForm({ name: user.name, email: user.email, password: '' });
        }
        // eslint-disable-next-line
    }, [user]);

    const handleCancelClick = () => {
        setForm({ name: user.name, email: user.email, password: '' })
    }

    return (
        <div className={styles.form}>
            {isLoading && <span className="text text_type_main-default">Загрузка...</span>}
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    onChange={onChange}
                    value={form.name}
                    name={'name'}
                    placeholder="Имя"
                    icon={"EditIcon"}
                    extraClass="mb-2"
                />
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    placeholder="Логин"
                    noValidate={true}
                    isIcon={true}
                    extraClass="mb-2"
                />
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    placeholder={"Пароль"}
                    icon={"ShowIcon"}
                    extraClass="mb-2"
                />
                {(form.name.length > 0 || form.email.length > 0 || form.password.length >= 6) &&
                    <div className={styles.buttons}>
                        <Button htmlType="button" type="secondary" size="large" onClick={handleCancelClick}>
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="large" extraClass="">
                            Сохранить
                        </Button>
                    </div>
                }
                <div>
                    {hasError &&
                        <>
                            <p className="text text_type_main-default text_color_error">Ошибка: </p>
                            <p className="text text_type_main-default text_color_error">{errorMessage}</p>
                        </>
                    }
                </div>
            </form>
        </div>
    );
}

export default ProfileInfo;