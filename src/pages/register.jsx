import React from 'react';
import {
    Link,
} from 'react-router-dom';
import {
    Input,
	EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from '../components/app-header/app-header';
import styles from './register.module.css';

export function RegisterPage() {

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
                        Регистрация
                    </h1>
                    <Input
                        type="text"
                        name={'name'}
                        placeholder={'Имя'}
                        extraClass="mt-6"
                    />
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
                        Зарегистрироваться
                    </Button>
                    <p
                        className="text text_type_main-default text_color_inactive mt-20"
                    >
                        Уже зарегистрированы? <Link to="/login">Войти</Link>
                    </p>
                </article>
            </main>
        </React.Fragment>
    );

}