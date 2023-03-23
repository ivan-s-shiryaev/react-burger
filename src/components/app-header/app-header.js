import React from 'react';
import {
    NavLink,
    Link,
} from 'react-router-dom';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

const AppHeader = () => {

    const isNavLinkActive = React.useCallback(
        ({ isActive }) => {

            const result = 'text text_type_main-default';

            return isActive ? `${result} ${styles.text_color_active}` : `${result} text_color_inactive`;

        }
        , []
    );

    return (
        <header
            className="pt-4 pb-4"
        >
            <nav
                className={styles.menu}
            >
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={isNavLinkActive}
                        >
                            <BurgerIcon
                                type="secondary"
                            />
                            <span>
                                Конструктор
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/comingsoon"
                            className={isNavLinkActive}
                        >
                            <ListIcon
                                type="secondary"
                            />
                            <span>
                                Лента заказов
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <nav
                className={styles.menu}
            >
                <ul>
                    <li>
                        <NavLink
                            to="/profile"
                            className={isNavLinkActive}
                        >
                            <ProfileIcon
                                type="secondary"
                            />
                            <span>
                                Личный кабинет
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Link
                to="/"
            >
                <Logo />
            </Link>
        </header>
    );

};

export default AppHeader;