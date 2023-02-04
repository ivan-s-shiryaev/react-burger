import React from 'react';
import {
    Link,
} from 'react-router-dom';
import {
	EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from '../components/app-header/app-header';
import styles from './login.module.css';

export function LoginPage() {

    return (
        <React.Fragment>
            <AppHeader />
            <main
                className={styles.wrapper}
            >
                <article
                    className={styles.container}
                >
                    <h1
                        className="text text_type_main-medium"
                    >
                        Вход
                    </h1>
                    <EmailInput
                        name={'email'}
                        placeholder={'E-mail'}
                        isIcon={false}
                        extraClass="mt-6"
                    />
                    <PasswordInput
                        name={'password'}
                        extraClass="mt-6"
                    />
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        extraClass="mt-6"
                    >
                        Войти
                    </Button>
                    <p
                        className="text text_type_main-default text_color_inactive mt-20"
                    >
                        Вы &mdash; новый пользователь? <Link to="/register">Зарегистрироваться</Link>
                    </p>
                    <p
                        className="text text_type_main-default text_color_inactive mt-4"
                    >
                        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
                    </p>
                </article>
            </main>
        </React.Fragment>
    );

}