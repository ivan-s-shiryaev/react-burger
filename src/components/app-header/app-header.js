import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';

class AppHeader extends React.Component {

    render() {

        return (
            <header className="pt-4 pb-4">
                <nav className={appHeaderStyles.menu}>
                    <ul>
                        <li className="text text_type_main-default">
                            <BurgerIcon type="primary" />
                            <span>Конструктор</span>
                        </li>
                        <li className="text text_type_main-default text_color_inactive">
                            <ListIcon type="secondary" />
                            <span>Лента заказов</span>
                        </li>
                    </ul>
                </nav>
                <nav className={appHeaderStyles.menu}>
                    <ul>
                        <li className="text text_type_main-default text_color_inactive">
                            <ProfileIcon type="secondary" />
                            <span>Личный кабинет</span>
                        </li>
                    </ul>
                </nav>
                <a href="/"><Logo /></a>
            </header>
        );

    }

}

export default AppHeader;