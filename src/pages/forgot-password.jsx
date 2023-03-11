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
	EmailInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    validateEmail,
} from '../utils';
import {
    SET_AUTH_FORGOT_DATA,
    readAuthForgot,
} from '../services/actions/auth';
import styles from './forgot-password.module.css';

export function ForgotPasswordPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        data: {
            email,
        },
        request,
    } = useSelector((state) => state.auth.forgot);
    const {
        data: user,
    } = useSelector((state) => state.auth.user);

    const onFormSubmit = React.useCallback(
        (event) => {

            event.preventDefault();

            if (
                email
                && validateEmail(email)
            ) {

                (
                    async () => {
                        if(await dispatch(readAuthForgot({ email }))) {
                            navigate('/reset-password', { state: { ...location.state, forgot: true } });
                        }
                    }
                )();

            }

        }
        , [
            dispatch,
            navigate,
            email,
            location.state,
        ]
    );

    const onInputChange = React.useCallback(
        (event) => {
            dispatch({
                type: SET_AUTH_FORGOT_DATA,
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
                            <EmailInput
                                name={'email'}
                                value={email}
                                onChange={onInputChange}
                                disabled={request}
                                placeholder={'Укажите e-mail'}
                                isIcon={false}
                                extraClass="mt-6"
                            />
                            <Button
                                htmlType="submit"
                                type="primary"
                                disabled={request}
                                size="medium"
                                extraClass="mt-6"
                            >
                                Восстановить
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