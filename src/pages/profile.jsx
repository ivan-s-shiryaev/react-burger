import React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    useNavigate,
    NavLink,
} from 'react-router-dom';
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    validateName,
    validateEmail,
    validatePassword,
    getCookie,
} from '../utils';
import {
    updateAuthUser,
    readAuthLogout,
} from '../services/actions/auth';
import AppHeader from '../components/app-header/app-header';
import styles from './profile.module.css';

export function ProfilePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = getCookie('access');
    const refreshToken = getCookie('refresh');

    const {
        data: {
            name,
            email,
        },
    } = useSelector((state) => state.auth.user);

    const [ data, setData ] = React.useState({ name, email, password: '' });
    const [ active, setActive ] = React.useState('');
    const ref = {
        name: React.useRef(null),
        email: React.useRef(null),
        password: React.useRef(null),
    };

    React.useEffect(
        () => {
            setData({ name, email, password: '' });
        }
        , [
            name,
            email,
        ]
    );

    const control = React.useMemo(
        () => JSON.stringify(data) !== JSON.stringify({ name, email, password: '' })
        , [
            data,
            name,
            email,
        ]
    );

    const onInputChange = React.useCallback(
        (event) => {
            setData({
                ...data,
                [event.target.name]: event.target.value,
            });
        }
        , [ data ]
    );

    const onInputBlur = React.useCallback(
        () => {
            setActive('');
        }
        , [ setActive ]
    );

    const onInputIconClick = (argument) => () => {
        setActive(argument);
        setTimeout(() => ref[argument].current?.focus(), 0);
    };

    const onFormSubmit = React.useCallback(
        (event) => {

            event.preventDefault();

            if (
                data.name
                && data.email 
                && validateName(data.name)
                && validateEmail(data.email)
                && (
                    !data.password
                    || (
                        data.password
                        && validatePassword(data.password)
                    )
                )
            ) {

                (
                    async () => {
                        await dispatch(updateAuthUser({ data, token: accessToken }))
                    }
                )();

                setData(state => ({ ...state, password: '' }));

            }

            

        }
        , [
            dispatch,
            data,
            accessToken,
        ]
    );

    const onFormReset = React.useCallback(
        (event) => {

            event.preventDefault();

            setData({ name, email, password: '' });

        }
        , [
            name,
            email,
        ]
    );

    const isNavLinkActive = React.useCallback(
        ({ isActive }) => {

            const result = 'text text_type_main-medium';

            return isActive ? `${result} ${styles.active}` : result;

        }
        , []
    );

    const onNavLinkLogoutClick = React.useCallback(
        (event) => {

            event.preventDefault();

            (
                async () => {
                    if (await dispatch(readAuthLogout({ token: refreshToken }))) {
                        navigate('/login', {replace: true});
                    }
                }
            )();

        }
        , [
            dispatch,
            navigate,
            refreshToken,
        ]
    );

    return (
        <React.Fragment>
            <AppHeader />
            <main
                className={`${styles.wrapper} pl-5 pr-5`}
            >
                <article
                    className={`${styles.container} mt-30`}
                >
                    <form
                        onSubmit={onFormSubmit}
                        onReset={onFormReset}
                    >
                        <Input
                            name={'name'}
                            value={data.name}
                            onChange={onInputChange}
                            onIconClick={onInputIconClick('name')}
                            onBlur={onInputBlur}
                            disabled={active !== 'name'}
                            placeholder={'Имя'}
                            icon={active === 'name' ? 'CloseIcon' : 'EditIcon'}
                            extraClass={`${styles['placeholder-filled']}`}
                            ref={ref.name}
                        />
                        <Input
                            name={'email'}
                            value={data.email}
                            onChange={onInputChange}
                            onIconClick={onInputIconClick('email')}
                            onBlur={onInputBlur}
                            disabled={active !== 'email'}
                            placeholder={'Логин'}
                            icon={active === 'email' ? 'CloseIcon' : 'EditIcon'}
                            extraClass={`${styles['placeholder-filled']} mt-6`}
                            ref={ref.email}
                        />
                        <Input
                            name={'password'}
                            value={active === 'password' ? data.password : new Array(data.password.length + 1).join('*')}
                            onChange={onInputChange}
                            onIconClick={onInputIconClick('password')}
                            onBlur={onInputBlur}
                            disabled={active !== 'password'}
                            placeholder={'Пароль'}
                            icon={active === 'password' ? 'CloseIcon' : 'EditIcon'}
                            extraClass={`${styles['placeholder-filled']} mt-6`}
                            ref={ref.password}
                        />
                        {
                            control
                                ? (
                                    <div
                                        className={`${styles.control} mt-6`}
                                    >
                                        <Button
                                            htmlType="reset"
                                            type="secondary"
                                            size="medium"
                                        >
                                            Отмена
                                        </Button>
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                            size="medium"
                                        >
                                            Сохранить
                                        </Button>
                                    </div>
                                )
                                : null
                        }
                    </form>
                </article>
                <aside
                    className={`${styles.container} mt-30`}
                >
                    <nav
                        className={styles.menu}
                    >
                        <ul>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={isNavLinkActive}
                                >
                                    Профиль
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile/orders"
                                    className={isNavLinkActive}
                                >
                                    История заказов
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={onNavLinkLogoutClick}
                                    className={isNavLinkActive}
                                >
                                    Выход
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <p
                        className={`${styles.info} text text_type_main-default text_color_inactive mt-20`}
                    >
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </aside>
            </main>
        </React.Fragment>
    );

}