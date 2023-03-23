import React from 'react';
import {
    useSelector,
    useDispatch,
} from 'react-redux';
import {
    useNavigate,
    useLocation,
    Navigate,
    Link,
} from 'react-router-dom';
import {
	Input ,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    validatePassword,
} from '../utils';
import {
    SET_AUTH_RESET_DATA,
    readAuthReset,
} from '../services/actions/auth';
import styles from './reset-password.module.css';

export function ResetPasswordPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        data: {
            password,
            token,
        },
        request,
    } = useSelector((state) => state.auth.reset);
    const {
        data: user,
    } = useSelector((state) => state.auth.user);

    React.useEffect(
        () => {
            if (!location.state?.forgot) {
                navigate('/forgot-password', { replace: true });
            }
        },
        [
            navigate,
            location.state,
        ]
      );

    const onFormSubmit = React.useCallback(
        (event) => {

            event.preventDefault();

            if (
                password
                && validatePassword(password)
            ) {

                (
                    async () => {
                        if(await dispatch(readAuthReset({ password, token }))) {
                            navigate('/login', {replace: true});
                        } else {
                            navigate('/forgot-password', {replace: true});
                        }
                    }
                )();

            }

        }
        , [
            dispatch,
            navigate,
            password,
            token,
        ]
    );

    const onInputChange = React.useCallback(
        (event) => {
            dispatch({
                type: SET_AUTH_RESET_DATA,
                payload: {
                    [event.target.name]: event.target.value,
                },
            });
        }
        , [ dispatch ]
    );

    return user?.email
        ? (
            <Navigate
                to="/"
                replace
            />
        )
        : (
            <React.Fragment>
                <main
                    className={styles.wrapper}
                >
                    <form
                        onSubmit={onFormSubmit}
                    >
                        <article
                            className={styles.container}
                        >
                            <h1
                                className="text text_type_main-medium"
                            >
                                Восстановление пароля
                            </h1>
                            <PasswordInput
                                name={'password'}
                                value={password}
                                onChange={onInputChange}
                                disabled={request}
                                placeholder={'Введите новый пароль'}
                                extraClass="mt-6"
                            />
                            <Input
                                type="text"
                                name={'token'}
                                value={token}
                                onChange={onInputChange}
                                disabled={request}
                                placeholder={'Введите код из письма'}
                                extraClass="mt-6"
                            />
                            <Button
                                htmlType="submit"
                                type="primary"
                                disabled={request}
                                size="medium"
                                extraClass="mt-6"
                            >
                                Сохранить
                            </Button>
                            <p
                                className="text text_type_main-default text_color_inactive mt-20"
                            >
                                Вспомнили пароль? <Link to="/login">Войти</Link>
                            </p>
                        </article>
                    </form>
                </main>
            </React.Fragment>
        )
    ;

}