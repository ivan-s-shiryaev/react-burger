import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';

const AppHeader = () => {

    return (
        <header
            className="pt-4 pb-4"
        >
            <nav
                className={appHeaderStyles.menu}
            >
                <ul>
                    <li
                        className="text text_type_main-default"
                    >
                        <a
                            href="/"
                        >
                            <BurgerIcon
                                type="primary"
                            />
                            <span>
                                Конструктор
                            </span>
                        </a>
                    </li>
                    <li
                        className="text text_type_main-default text_color_inactive"
                    >
                        <a
                            href="/"
                        >
                            <ListIcon
                                type="secondary"
                            />
                            <span>
                                Лента заказов
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
            <nav
                className={appHeaderStyles.menu}
            >
                <ul>
                    <li
                        className="text text_type_main-default text_color_inactive"
                    >
                        <a
                            href="/"
                        >
                            <ProfileIcon
                                type="secondary"
                            />
                            <span>
                                Личный кабинет
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
            <a
                href="/"
            >
                <Logo />
            </a>
        </header>
    );

};

export default AppHeader;